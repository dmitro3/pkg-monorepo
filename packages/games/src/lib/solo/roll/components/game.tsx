import { useGameSkip } from "../../../game-provider";
import React from "react";
import useRollGameStore from "../store";
import { RollGameResult } from "../types";

export type RollGameProps = React.ComponentProps<"div"> & {
  gameResults: RollGameResult[];
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: () => void;
  onAnimationSkipped?: () => void;
};

export const RollGame = ({ gameResults, children }: RollGameProps) => {
  const { updateRollGameResults, updateGameStatus } = useRollGameStore([
    "updateRollGameResults",
    "updateGameStatus",
  ]);

  const { updateSkipAnimation } = useGameSkip();

  React.useEffect(() => {
    if (gameResults.length) {
      updateSkipAnimation(false);
      updateRollGameResults(gameResults);
      updateGameStatus("PLAYING");
    }
  }, [gameResults]);

  return <>{children}</>;
};
