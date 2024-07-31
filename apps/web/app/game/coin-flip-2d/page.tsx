"use client";

import { CoinFlipGame, LiveResults } from "@winrlabs/web3-games";

export default function CoinFlipPage() {
  return (
    <>
      <CoinFlipGame
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        minWager={0.1}
        maxWager={2000}
      />
      <LiveResults />
    </>
  );
}
