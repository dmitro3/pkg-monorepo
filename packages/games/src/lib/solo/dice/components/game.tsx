"use client";

import * as React from "react";
import useRangeGameStore from "../store";
import { RangeGameResult } from "../types";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";

export type RangeGameProps = React.ComponentProps<"div"> & {
  results?: RangeGameResult[];
  /**
   * Runs on each animation step
   */
  onAnimationStep?: (step: number) => void;
  /**
   * Runs when the animation is completed
   */
  onAnimationCompleted?: () => void;
};

export const RangeGame = ({
  onAnimationStep = () => { },
  onAnimationCompleted = () => { },
  results,
  children,
}: RangeGameProps) => {
  const sliderEffect = useAudioEffect(SoundEffects.SLIDER);

  const {
    rangeGameResults,
    updateCurrentAnimationCount,
    currentAnimationCount,
    updateRangeGameResults,
  } = useRangeGameStore([
    "updateRangeGameResults",
    "rangeGameResults",
    "updateCurrentAnimationCount",
    "currentAnimationCount",
    "updateRollValue",
    "rollValue",
  ]);

  React.useEffect(() => {
    if (results) {
      updateRangeGameResults(results);
    }
  }, [results]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);


  const animCallback = async (curr = 0) => {
    const isAnimationFinished = curr === rangeGameResults.length;

    if (isAnimationFinished) {
      setTimeout(() => {
        updateCurrentAnimationCount(0);
        onAnimationCompleted();
      }, 1000);

      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      return;
    }


    sliderEffect.play();
    updateCurrentAnimationCount(curr);
    onAnimationStep(curr);
  }

  React.useEffect(() => {
    if (rangeGameResults.length === 0) return;
    let curr = currentAnimationCount;

    intervalRef.current = setInterval(() => {
      animCallback(curr);
      curr += 1;
    }, 1000);

  }, [rangeGameResults]);

  return <>{children}</>;
};
