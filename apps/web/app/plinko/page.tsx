"use client";

import { PlinkoGameResult, PlinkoTemplate } from "@winrlabs/games";
import { useState } from "react";

export default function PlinkoPage() {
  const [results, setResults] = useState<PlinkoGameResult[]>([]);

  return (
    <div>
      <PlinkoTemplate
        options={{
          scene: {
            backgroundImage: "url(/plinko.png)",
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
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
            },
            {
              payout: 1,
              payoutInUsd: 1,
              outcomes: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
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
}
