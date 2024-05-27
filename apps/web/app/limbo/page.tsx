"use client";

import React, { useState } from "react";
import { LimboGameResult, LimboTemplate } from "@winrlabs/games";

const LimboPage = () => {
  const [results, setResults] = useState<LimboGameResult[]>([]);

  return (
    <LimboTemplate
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
            number: 20,
          },
          {
            payout: 0,
            payoutInUsd: 1,
            number: 30,
          },
          {
            payout: 0,
            payoutInUsd: 1,
            number: 40,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            number: 15,
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
  );
};

export default LimboPage;
