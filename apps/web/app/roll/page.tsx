"use client";

import { RollTemplate } from "@winrlabs/games";
import React from "react";

const RollPage = () => {
  const [results, setResults] = React.useState<any>([]);

  return (
    <div>
      <RollTemplate
        maxWager={100}
        minWager={1}
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        onSubmit={(data) => {
          console.log(data, "data");
          // send request

          // get results

          setResults([
            {
              payout: 1,
              payoutInUsd: 1,
              dice: 1,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              dice: 2,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              dice: 4,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              coinSide: 1,
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

export default RollPage;
