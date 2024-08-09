import React from "react";
import {
  MINES_GAME_STATUS,
  MinesGameResult,
  MinesGameResultOnComplete,
} from "../types";
import { useMinesGameStateStore } from "../store";

export type MinesGameProps = React.ComponentProps<"div"> & {
  gameResults: MinesGameResult[];
  isLoading?: boolean;
  onAnimationCompleted?: (result: MinesGameResultOnComplete) => void;
};

export const MinesGame = ({ gameResults, children }: MinesGameProps) => {
  const { updateMinesGameResults, updateGameStatus } = useMinesGameStateStore([
    "updateMinesGameResults",
    "updateGameStatus",
  ]);

  React.useEffect(() => {
    if (gameResults.length) {
      updateMinesGameResults(gameResults);
      updateGameStatus(MINES_GAME_STATUS.IN_PROGRESS);
    }
  }, [gameResults]);

  return <>{children}</>;
};
