import { useCoinFlipGameStore } from "..";
import { CoinFlipGameResult } from "../types";
import React from "react";

export type CoinFlipGameProps = React.ComponentProps<"div"> & {
  gameResults: CoinFlipGameResult[];
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: () => void;
};

export const CoinFlipGame = ({ gameResults, children }: CoinFlipGameProps) => {
  const { updateCoinFlipGameResults, updateGameStatus } = useCoinFlipGameStore([
    "updateCoinFlipGameResults",
    "updateGameStatus",
  ]);

  React.useEffect(() => {
    if (gameResults.length) {
      updateCoinFlipGameResults(gameResults);
      updateGameStatus("PLAYING");
    }
  }, [gameResults]);

  return <>{children}</>;
};
