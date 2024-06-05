"use client";

import {
  AudioContextProvider,
  CoinFlipGameResult,
  CoinFlipTemplate,
  CoinSide,
} from "@winrlabs/games";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function CoinFlipPage() {
  const [results, setResults] = useState<CoinFlipGameResult[]>([]);

  return (
    <CoinFlipTemplate
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
            coinSide: 1,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            coinSide: 0,
          },
          {
            payout: 1,
            payoutInUsd: 1,
            coinSide: 0,
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
      onFormChange={(val) => {
        console.log("form val updated");
      }}
    />
  );
}
