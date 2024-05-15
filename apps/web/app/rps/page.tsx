"use client";

import { RPSGameResult, RockPaperScissors, RpsTemplate } from "@winrlabs/games";
import React from "react";

const RpsPage = () => {
  const [results, setResults] = React.useState<RPSGameResult[]>([]);

  return (
    <div>
      <RpsTemplate
        maxWager={100}
        minWager={1}
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        onSubmitGameForm={(data) => {
          console.log(data, "data");
          // send request

          // get results

          setResults([
            {
              payout: 1,
              payoutInUsd: 1,
              rps: RockPaperScissors.PAPER,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              rps: RockPaperScissors.ROCK,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              rps: RockPaperScissors.SCISSORS,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              rps: RockPaperScissors.PAPER,
            },
          ]);
        }}
        onAnimationStep={(e) => {
          console.log("STEP", e);
        }}
        onAnimationCompleted={() => {
          setResults([]);
          console.log("game completed");
        }}
        onAnimationSkipped={() => {
          console.log("game skipped");
        }}
        gameResults={results}
      />
    </div>
  );
};

export default RpsPage;
