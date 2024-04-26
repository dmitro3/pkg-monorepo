"use client";

import { DiceTemplate } from "@winrlabs/games";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any>();

  return (
    <div>
      <DiceTemplate
        options={{
          scene: {
            backgroundImage: "url(/range.svg)",
          },
        }}
        onSubmit={(data) => {
          console.log(data, "data");
          // send request
          // get results

          setResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: Math.floor(Math.random() * 100),
            },
            {
              payout: 2,
              payoutInUsd: 2,
              resultNumber: Math.floor(Math.random() * 100),
            },
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: Math.floor(Math.random() * 100),
            },
          ]);
        }}
        onAnimationCompleted={() => setResults([])}
        results={results}
      />
      {/* <button
        style={{ marginTop: 400 }}
        onClick={() => {
          setResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 30,
            },
            {
              payout: 2,
              payoutInUsd: 2,
              resultNumber: 49,
            },
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 10,
            },
          ]);
        }}
      >
        xd
      </button> */}
    </div>
  );
}
