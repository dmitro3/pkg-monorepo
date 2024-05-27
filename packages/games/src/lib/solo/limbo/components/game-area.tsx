import React from "react";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";
import useLimboGameStore from "../store";
import { useGameSkip } from "../../../game-provider";
import { LimboGameResult } from "../types";

export interface GameAreaProps {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: LimboGameResult[]) => void;
  onAnimationSkipped?: (result: LimboGameResult[]) => void;
  children: React.ReactNode;
}

const GameArea: React.FC<GameAreaProps> = ({
  onAnimationCompleted,
  onAnimationStep,
  onAnimationSkipped = () => {},
  children,
}) => {
  const skipRef = React.useRef<boolean>(false);

  const effect = useAudioEffect(SoundEffects.RANGE_WIN);

  const { isAnimationSkipped } = useGameSkip();

  const {
    addLastBet,
    updateLastBets,
    limboGameResults,
    updateGameStatus,
    updateLimboGameResults,
  } = useLimboGameStore([
    "addLastBet",
    "removeLastBet",
    "updateLastBets",
    "limboGameResults",
    "updateGameStatus",
    "updateLimboGameResults",
  ]);

  React.useEffect(() => {
    if (limboGameResults.length === 0) return;

    const turn = (i = 0) => {
      const resultNumber = Number(limboGameResults[i]?.number) || 0;
      const payout = limboGameResults[i]?.payout || 0;
      const payoutInUsd = limboGameResults[i]?.payoutInUsd || 0;

      const t = setTimeout(() => {
        if (skipRef.current) {
          clearTimeout(t);
          return;
        }
        const curr = i + 1;

        onAnimationStep && onAnimationStep(curr);

        addLastBet({
          number: resultNumber,
          payout,
          payoutInUsd,
        });

        if (payout > 0) {
          effect.play();
        }

        if (skipRef.current) {
          onSkip();
        } else if (limboGameResults.length === curr) {
          updateLimboGameResults([]);
          onAnimationCompleted && onAnimationCompleted(limboGameResults);
          setTimeout(() => updateGameStatus("ENDED"), 1000);
        } else {
          setTimeout(() => turn(curr), 350);
        }
      }, 1250);
    };
    turn();
  }, [limboGameResults]);

  const onSkip = () => {
    updateLastBets(limboGameResults);
    updateLimboGameResults([]);
    onAnimationSkipped(limboGameResults);
    setTimeout(() => updateGameStatus("ENDED"), 50);
  };

  React.useEffect(() => {
    skipRef.current = isAnimationSkipped;

    if (isAnimationSkipped) {
      onSkip();
    }
  }, [isAnimationSkipped]);

  return <div className="wr-relative wr-h-full wr-w-full">{children}</div>;
};

export default GameArea;
