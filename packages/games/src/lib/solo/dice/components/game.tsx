"use client";

import * as React from "react";
import useRangeGameStore from "../store";
import { DiceGameResult } from "../types";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";
import { useGameSkip } from "../../../game-provider";

export type RangeGameProps = React.ComponentProps<"div"> & {
  results?: DiceGameResult[];
  /**
   * Runs on each animation step
   */
  onAnimationStep?: (step: number) => void;
  /**
   * Runs when the animation is completed
   */
  onAnimationCompleted?: (result: DiceGameResult[]) => void;
  onAnimationSkipped?: (result: DiceGameResult[]) => void;
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
    diceGameResults,
    updateCurrentAnimationCount,
    currentAnimationCount,
    updateDiceGameResults,
    addLastBet,
    updateLastBets,
    updateGameStatus,
  } = useRangeGameStore([
    "updateDiceGameResults",
    "diceGameResults",
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
      updateDiceGameResults(results);
    }

    if (results?.length) {
      updateSkipAnimation(false);
      updateGameStatus("PLAYING");
    }
  }, [results]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const animCallback = async (curr = 0) => {
    const isAnimationFinished = curr === diceGameResults.length;

    if (isAnimationFinished) {
      setTimeout(() => {
        updateCurrentAnimationCount(0);
        onAnimationCompleted(diceGameResults);
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
    if (diceGameResults.length === 0) return;

    if (!isAnimationSkipped) {
      let curr = currentAnimationCount;

      intervalRef.current = setInterval(() => {
        animCallback(curr);
        diceGameResults[curr] &&
          addLastBet(diceGameResults[curr] as DiceGameResult);
        curr += 1;
      }, 1000);
    } else {
      onSkip();
    }
  }, [diceGameResults, isAnimationSkipped]);

  const onSkip = () => {
    updateLastBets(diceGameResults);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTimeout(() => {
      updateGameStatus("ENDED");
      updateDiceGameResults([]);
      onAnimationSkipped(diceGameResults);
    }, 50);
  };

  return <>{children}</>;
};
