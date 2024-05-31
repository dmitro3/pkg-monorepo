"use client";

import {
  COIN_SIDE,
  CoinFlip3DTemplate,
  CoinFlip3dGameResult,
} from "@winrlabs/games";
import { useState } from "react";

export default function CoinFlip3DPage() {
  const [results, setResults] = useState<CoinFlip3dGameResult[]>([]);

  return (
    <CoinFlip3DTemplate
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
            coinSide: COIN_SIDE.BTC,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            coinSide: COIN_SIDE.ETH,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            coinSide: COIN_SIDE.BTC,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            coinSide: COIN_SIDE.ETH,
          },
        ]);
      }}
      buildedGameUrl={process.env.NEXT_PUBLIC_BASE_CDN_URL || ""}
      onAnimationStep={(e) => {
        console.log("STEP", e);
      }}
      onAnimationCompleted={() => {
        setResults([]);
        console.log("game completed");
      }}
      gameResults={results}
    />
  );
}
