"use client";

import { Plinko3dGameResult, Plinko3dTemplate } from "@winrlabs/games";
import React, { useState } from "react";

const Plinko3d = () => {
  const [results, setResults] = useState<Plinko3dGameResult[]>([]);

  return (
    <div>
      <Plinko3dTemplate
        buildedGameUrl={process.env.NEXT_PUBLIC_BASE_CDN_URL || ""}
        options={{
          scene: {
            loader: "/plinko-3d/loader.png",
          },
          betController: {
            logo: "/plinko-3d/plinko.png",
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
        minWager={1}
        maxWager={100}
        onAnimationStep={(e) => {
          console.log("STEP", e);
        }}
        onAnimationCompleted={() => {
          setResults([]);
          console.log("game completed");
        }}
        gameResults={results}
      />
    </div>
  );
};

export default Plinko3d;
