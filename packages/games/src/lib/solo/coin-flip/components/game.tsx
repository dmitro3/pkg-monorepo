import { useCoinFlipGameStore } from "..";
import { CoinFlipGameResult } from "../types";
import React from "react";

export type CoinFlipGameProps = React.ComponentProps<"div"> & {
  gameResults: CoinFlipGameResult[];
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: () => void;
};

export const CoinFlipGame = ({ gameResults, children }: CoinFlipGameProps) => {
  const { updateCoinFlipGameResults } = useCoinFlipGameStore([
    "updateCoinFlipGameResults",
  ]);

  React.useEffect(() => {
    if (gameResults.length) updateCoinFlipGameResults(gameResults);
  }, [gameResults]);

  return <>{children}</>;
};
