"use client";

import { RouletteGameResult, RouletteTemplate } from "@winrlabs/games";
import { useState } from "react";

export default function RoulettePage() {
  const [results, setResults] = useState<RouletteGameResult[]>([]);

  return (
    <RouletteTemplate
      maxWager={100}
      minWager={1}
      onSubmitGameForm={(data) => {
        console.log(data, "data");
        // send request

        // get results

        setResults([
          {
            won: true,
            payout: 1,
            payoutInUsd: 1,
            outcome: 2,
          },
          {
            won: true,
            payout: 1,
            payoutInUsd: 1,
            outcome: 23,
          },
          {
            won: true,
            payout: 1,
            payoutInUsd: 1,
            outcome: 12,
          },
          {
            won: true,
            payout: 1,
            payoutInUsd: 1,
            outcome: 0,
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
}
