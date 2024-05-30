import React from "react";
import { RouletteGameProps } from "../types";
import useRouletteGameStore from "../store";
import { useGameSkip } from "../../../game-provider";

export const RouletteGame = ({
  gameResults,
  children,
}: RouletteGameProps & {
  children: React.ReactNode;
}) => {
  const { updateGameStatus, updateRouletteGameResults } = useRouletteGameStore([
    "updateRouletteGameResults",
    "updateGameStatus",
  ]);

  const { updateSkipAnimation } = useGameSkip();

  React.useEffect(() => {
    if (gameResults.length) {
      console.log(gameResults, "gameres");

      updateSkipAnimation(false);
      updateRouletteGameResults(gameResults);
      updateGameStatus("PLAYING");
    }
  }, [gameResults]);

  return <>{children}</>;
};
