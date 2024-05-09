"use client";

import React, { useContext, useState, useEffect } from "react";
import { CDN_URL } from "../constants";

export enum SoundEffects {
  COIN_FLIP_TOSS,
  COIN_FLIP_WIN,
  SLIDER,
  FALLING,
}

export interface AudioContextType {
  volume: number;
  onVolumeChange: (v: number) => void;
}

const noop = (): void => {
  // Do nothing
};

const defaultValue: AudioContextType = {
  volume: 1,
  onVolumeChange: noop,
};

const AudioContext = React.createContext<AudioContextType>(defaultValue);

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export const AudioContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window == "undefined") return 1;

    const storedVolume = window.localStorage.getItem("volume");

    if (storedVolume === null) {
      const defaultVolume = 1; // Set your desired default volume here

      window.localStorage.setItem("volume", String(defaultVolume));

      return defaultVolume;
    }

    const parsedVolume = Number(storedVolume);

    return isNaN(parsedVolume) ? 1 : parsedVolume;
  });

  const onVolumeChange = (vol: number) => {
    if (typeof window == "undefined") return;

    setVolume(vol);

    window.localStorage.setItem("volume", String(vol));
  };

  return (
    <AudioContext.Provider value={{ volume, onVolumeChange }}>
      {children}
    </AudioContext.Provider>
  );
};

export const effects: Map<SoundEffects, string> = new Map();

effects.set(SoundEffects.COIN_FLIP_TOSS, "coin-toss.wav");
effects.set(SoundEffects.COIN_FLIP_WIN, "coin-flip-win.wav");
effects.set(SoundEffects.SLIDER, "slider-effect.mp3");

type PlayOptions = {
  playbackRate?: number;
  currentTime?: number;
  loop?: boolean;
  autoplay?: boolean;
};

export const baseCdnUrl = CDN_URL + "/sounds";

export const useAudioEffect = (type: SoundEffects) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  const { volume } = useAudioContext();

  useEffect(() => {
    if (typeof window == "undefined") return;

    const currentEffect = effects.get(type);

    if (!currentEffect) return;

    let audio;

    audio = new Audio(`${baseCdnUrl}/${effects.get(type)}`);

    setAudio(audio);
  }, []);

  const setOptions = (options?: PlayOptions) => {
    if (audio) {
      audio.playbackRate = options?.playbackRate || 1;

      audio.currentTime = options?.currentTime || 0;

      audio.loop = typeof options?.loop === "boolean" ? options.loop : false;

      audio.autoplay =
        typeof options?.autoplay === "boolean" ? options.autoplay : false;
    }
  };

  const play = async (options?: PlayOptions): Promise<void> => {
    return new Promise((resolve) => {
      if (audio) {
        setOptions(options);

        audio.play();

        audio.onended = () => {
          resolve();
        };
      } else {
        resolve();
      }
    });
  };

  const pause = () => {
    if (audio) {
      audio.pause();
    }
  };

  useEffect(() => {
    if (audio) audio.volume = volume / 100;

    if (audio && volume === 0) audio.muted = true;

    if (audio && volume > 0) audio.muted = false;
  }, [volume, audio]);

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  return {
    play,
    pause,
  };
};
