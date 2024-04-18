"use client";
import * as React from "react";
import useRangeGameStore from "./_store";
import { RangeGameResult } from "./_types";

export interface RangeGameProps {
  results?: RangeGameResult[];
  onAnimationStep?: (step: number) => void;

  children: React.ReactNode;
}

export const RangeGame = ({
  onAnimationStep = () => {},
  results,
  children,
}: RangeGameProps) => {
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

  React.useEffect(() => {
    if (rangeGameResults.length === 0) return;
    let curr = currentAnimationCount;

    intervalRef.current = setInterval(() => {
      setTimeout(() => {
        updateCurrentAnimationCount(++curr);
        onAnimationStep(curr);
      }, 0);

      const isAnimationFinished = curr === rangeGameResults.length - 1;

      if (isAnimationFinished) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);
  }, [rangeGameResults]);

  return <>{children}</>;
};
