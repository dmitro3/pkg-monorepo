"use client";

import * as React from "react";
import useRangeGameStore from "../store";
import { RangeGameResult } from "../types";

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
  onAnimationStep = () => {},
  onAnimationCompleted = () => {},
  results,
  children,
}: RangeGameProps) => {
  const {
    rangeGameResults,
    updateCurrentAnimationCount,
    currentAnimationCount,
    updateRangeGameResults,
    addLastBet,
  } = useRangeGameStore([
    "updateRangeGameResults",
    "rangeGameResults",
    "updateCurrentAnimationCount",
    "currentAnimationCount",
    "updateRollValue",
    "rollValue",
    "addLastBet",
  ]);

  React.useEffect(() => {
    if (results) {
      updateRangeGameResults(results);
    }
  }, [results]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (rangeGameResults.length === 0) return;
    let curr = currentAnimationCount;

    intervalRef.current = setInterval(async () => {
      setTimeout(() => {
        updateCurrentAnimationCount(++curr);
        onAnimationStep(curr);
        // addLastBet(rangeGameResults[curr - 1] as RangeGameResult);
      }, 0);

      const isAnimationFinished = curr === rangeGameResults.length - 1;

      if (isAnimationFinished) {
        setTimeout(() => {
          onAnimationCompleted();
          updateCurrentAnimationCount(0);
        });

        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);
  }, [rangeGameResults]);

  return <>{children}</>;
};
