"use client";

import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { Button, cn, useOutsideClick } from "@winrlabs/ui";
import { useAudioContext } from "../../hooks/use-audio-effect";
import { CDN_URL } from "../../constants";

export const AudioController: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { volume, onVolumeChange } = useAudioContext();

  const [isSliderOpen, setIsSliderOpen] = React.useState(false);

  const ref = useOutsideClick(() => {
    setIsSliderOpen(false);
  });

  const handleVolumeChange = (val: number[]) => {
    localStorage["lastVolume"] = val[0];

    onVolumeChange(val[0] as number);
  };

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center gap-2",
        className
      )}
      ref={ref}
      onMouseEnter={() => {
        setIsSliderOpen(true);
      }}
      onMouseLeave={() => {
        setIsSliderOpen(false);
      }}
    >
      <Button
        variant="secondary"
        type="button"
        className="h-9 w-9 p-0"
        onClick={() => {
          volume > 0
            ? onVolumeChange(0)
            : onVolumeChange(localStorage["lastVolume"] || 50);
        }}
      >
        {!volume || volume === 0 ? (
          <img src={`${CDN_URL}/icons/icon-mute.svg`} />
        ) : (
          <img src={`${CDN_URL}/icons/icon-sound.svg`} />
        )}
      </Button>

      <div
        className={cn("transition-all duration-300", {
          "opacity-0": !isSliderOpen,
          "opacity-100": isSliderOpen,
        })}
      >
        <Slider.Root
          className="relative z-20 flex h-1 w-12 items-center rounded-lg bg-gray-300"
          value={[volume]}
          max={100}
          step={1}
          min={0}
          orientation="horizontal"
          onValueChange={handleVolumeChange}
        >
          <Slider.Track className="relative flex-grow rounded-[9999px] bg-zinc-700">
            <Slider.Range className="absolute h-full rounded-full bg-white" />
          </Slider.Track>
          <Slider.Thumb
            className="absolute left-[-6px] top-1/2 block h-3 w-3 -translate-y-1/2 rounded-md bg-white"
            data-orientation="horizontal"
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </div>
  );
};

export const UnityAudioController: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { volume, onVolumeChange } = useAudioContext();

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center gap-2",
        className
      )}
    >
      <Button
        variant="secondary"
        type="button"
        className="h-9 w-9 p-0"
        onClick={() => {
          volume > 0 ? onVolumeChange(0) : onVolumeChange(100);
        }}
      >
        {!volume || volume === 0 ? (
          <img src={`${CDN_URL}/icons/icon-mute.svg`} />
        ) : (
          <img src={`${CDN_URL}/icons/icon-sound.svg`} />
        )}
      </Button>
    </div>
  );
};
