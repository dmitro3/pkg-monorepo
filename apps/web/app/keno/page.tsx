"use client";

import { KenoGameResult, KenoTemplate } from "@winrlabs/games";
import React from "react";

const KenoPage = () => {
  const [gameResults, setGameResults] = React.useState<KenoGameResult[]>([]);
  return (
    <KenoTemplate
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      minWager={0.1}
      maxWager={2000}
      gameResults={gameResults}
      onSubmitGameForm={(e) => {
        console.log("submit data", e);

        setGameResults([
          {
            resultNumbers: [11, 1, 23, 31, 4, 15, 21, 29, 5, 28],
            roundIndex: 0,
            settled: { payoutsInUsd: 2, profitInUsd: 1.5, won: true },
          },

          {
            resultNumbers: [1, 2, 3, 31, 4, 15, 21, 29, 5, 28],
            roundIndex: 1,
            settled: { payoutsInUsd: 2, profitInUsd: 1.5, won: false },
          },

          {
            resultNumbers: [10, 12, 3, 1, 4, 15, 21, 29, 5, 28],
            roundIndex: 1,
            settled: { payoutsInUsd: 2, profitInUsd: 1.5, won: true },
          },
        ]);
      }}
      onAnimationSkipped={() => console.log("skipped")}
      onAnimationStep={(e) => console.log("STEP", e)}
    />
  );
};

export default KenoPage;
