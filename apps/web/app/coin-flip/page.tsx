"use client";

import {
  CoinFlipTemplate,
  CoinFlipGameResult,
  CoinSide,
} from "@winrlabs/games";
import { useState } from "react";

export default function CoinFlipPage() {
  const [results, setResults] = useState<CoinFlipGameResult[]>([]);

  return (
    <div>
      <CoinFlipTemplate
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
              coinSide: CoinSide.HEADS,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              coinSide: CoinSide.TAILS,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              coinSide: CoinSide.HEADS,
            },
            {
              payout: 1,
              payoutInUsd: 1,
              coinSide: CoinSide.HEADS,
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
