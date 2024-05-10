"use client";

import * as React from "react";
import useRangeGameStore from "../store";
import { RangeGameResult } from "../types";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";
import { useGameSkip } from "../../../game-provider";

export type RangeGameProps = React.ComponentProps<"div"> & {
  results?: RangeGameResult[];
  /**
   * Runs on each animation step
   */
  onAnimationStep?: (step: number) => void;
  /**
   * Runs when the animation is completed
   */
  onAnimationCompleted?: (result: RangeGameResult[]) => void;
  onAnimationSkipped?: (result: RangeGameResult[]) => void;
};

export const RangeGame = ({
  onAnimationStep = () => {},
  onAnimationCompleted = () => {},
  onAnimationSkipped = () => {},
  results,
  children,
}: RangeGameProps) => {
  const sliderEffect = useAudioEffect(SoundEffects.SLIDER);

  const { isAnimationSkipped, updateSkipAnimation } = useGameSkip();

  const {
    rangeGameResults,
    updateCurrentAnimationCount,
    currentAnimationCount,
    updateRangeGameResults,
    addLastBet,
    updateLastBets,
    updateGameStatus,
  } = useRangeGameStore([
    "updateRangeGameResults",
    "rangeGameResults",
    "updateCurrentAnimationCount",
    "currentAnimationCount",
    "updateRollValue",
    "rollValue",
    "addLastBet",
    "updateLastBets",
    "updateGameStatus",
  ]);

  React.useEffect(() => {
    if (results) {
      updateRangeGameResults(results);
    }

    if (results?.length) {
      updateSkipAnimation(false);
      updateGameStatus("PLAYING");
    }
  }, [results]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const animCallback = async (curr = 0) => {
    const isAnimationFinished = curr === rangeGameResults.length;

    if (isAnimationFinished) {
      setTimeout(() => {
        updateCurrentAnimationCount(0);
        onAnimationCompleted(rangeGameResults);
      }, 1000);

      updateGameStatus("ENDED");
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      return;
    }

    sliderEffect.play();
    updateCurrentAnimationCount(curr);
    onAnimationStep(curr);
  };

  React.useEffect(() => {
    if (rangeGameResults.length === 0) return;

    if (!isAnimationSkipped) {
      let curr = currentAnimationCount;

      intervalRef.current = setInterval(() => {
        animCallback(curr);
        rangeGameResults[curr] &&
          addLastBet(rangeGameResults[curr] as RangeGameResult);
        curr += 1;
      }, 1000);
    } else {
      onSkip();
    }
  }, [rangeGameResults, isAnimationSkipped]);

  const onSkip = () => {
    updateLastBets(rangeGameResults);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTimeout(() => {
      updateGameStatus("ENDED");
      updateRangeGameResults([]);
      onAnimationSkipped(rangeGameResults);
    }, 50);
  };

  return <>{children}</>;
};
