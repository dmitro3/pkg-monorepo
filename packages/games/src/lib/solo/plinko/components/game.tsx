import React from "react";
import { useGameSkip } from "../../../game-provider";
import usePlinkoGameStore from "../store";
import { PlinkoGameResult } from "../types";

export type PlinkoGameProps = React.ComponentProps<"div"> & {
  gameResults: PlinkoGameResult[];
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: PlinkoGameResult[]) => void;
  onAnimationSkipped?: (result: PlinkoGameResult[]) => void;
};

export const PlinkoGame = ({ gameResults, children }: PlinkoGameProps) => {
  const { updatePlinkoGameResults, updateGameStatus } = usePlinkoGameStore([
    "updatePlinkoGameResults",
    "updateGameStatus",
  ]);

  const { updateSkipAnimation } = useGameSkip();

  React.useEffect(() => {
    if (gameResults.length) {
      updateSkipAnimation(false);
      updatePlinkoGameResults(gameResults);
      updateGameStatus("PLAYING");
    }
  }, [gameResults]);

  return <>{children}</>;
};
