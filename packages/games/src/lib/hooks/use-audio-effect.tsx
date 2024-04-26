"use client";

import React, { useContext, useState, useEffect } from "react";

export enum SoundEffects {
  FALLING,
  WIN,
  RANGE_WIN,
  RANGE_LOSE,
  FLIP,
  MOON_CRASH,
  MOON_MOVEMENT,
  MOON_LAUNCH,
  MOON_ROCKET_LAUNCH,
  MOON_BEEP,
  WHEEL_STEP,
  RPS,
  ROLLING_DICE,
  SLIDER,
  LIMBO_TICK,
  SLOTS_START,
  SLOTS_WIN,
  SLOTS_MAX_WIN,
  SLOTS_MAX_MULTIPLIER,
  ROULETTE,
  ROULETTE_SLIDE,
  MINES_BOMB,
  GLOBAL_WIN,
  BIG_WIN,
  SENSATIONAL_WIN,
  KENO_PICK,
  KENO_OUTCOME_NUMBER,
  FLIP_CARD,
  RUNNING_HORSE,
  HORSE_RACE_START,
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

effects.set(
  SoundEffects.FALLING,
  "mixkit-player-jumping-in-a-video-game-2043.wav"
);

effects.set(
  SoundEffects.WIN,
  "mixkit-quick-win-video-game-notification-269.wav"
);

effects.set(SoundEffects.RANGE_WIN, "mixkit-magical-coin-win-1936.wav");

effects.set(SoundEffects.RANGE_LOSE, "dice-fail8.mp3");

effects.set(SoundEffects.FLIP, "coin2.mp3");

effects.set(SoundEffects.MOON_CRASH, "moon-crash.mp3");

effects.set(SoundEffects.MOON_MOVEMENT, "moon-movement.mp3");

effects.set(SoundEffects.MOON_LAUNCH, "moon-launch.mp3");

effects.set(SoundEffects.MOON_ROCKET_LAUNCH, "moon-rocket-explosion.wav");

effects.set(SoundEffects.MOON_BEEP, "beepbeepbeep-53921.mp3");

effects.set(SoundEffects.WHEEL_STEP, "wheel-thick.wav");

effects.set(SoundEffects.RPS, "rps.mp3");

effects.set(SoundEffects.ROLLING_DICE, "rolling-dice.mp3");

effects.set(SoundEffects.SLIDER, "slider-effect.mp3");

effects.set(SoundEffects.LIMBO_TICK, "limbo-tick.mp3");

effects.set(SoundEffects.SLOTS_START, "slots-start.mp3");

effects.set(SoundEffects.SLOTS_MAX_WIN, "slots-max-win.wav");

effects.set(SoundEffects.SLOTS_WIN, "slots-win.wav");

effects.set(SoundEffects.SLOTS_MAX_MULTIPLIER, "slots-100x.mp3");

effects.set(SoundEffects.ROULETTE, "roulette.mp3");

effects.set(SoundEffects.ROULETTE_SLIDE, "roulette-slide.wav");

effects.set(SoundEffects.MINES_BOMB, "mines-bomb.mp3");

effects.set(SoundEffects.GLOBAL_WIN, "win.wav");

effects.set(SoundEffects.BIG_WIN, "big-win.m4a");

effects.set(SoundEffects.SENSATIONAL_WIN, "sensational-win.m4a");

effects.set(SoundEffects.KENO_PICK, "keno-pick.mp3");

effects.set(SoundEffects.KENO_OUTCOME_NUMBER, "outcome-number.wav");

effects.set(SoundEffects.FLIP_CARD, "card-flip.mp3");

effects.set(SoundEffects.RUNNING_HORSE, "running-horse.mp3");

effects.set(SoundEffects.HORSE_RACE_START, "horse-race-start.mp3");

type PlayOptions = {
  playbackRate?: number;
  currentTime?: number;
  loop?: boolean;
  autoplay?: boolean;
};

export const baseCdnUrl =
  "https://jbassets.fra1.digitaloceanspaces.com" + "/sounds";

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
