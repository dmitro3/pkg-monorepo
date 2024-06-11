"use client";

import { CoinFlipTemplateWithWeb3 } from "@winrlabs/web3-games";

export default function CoinFlipPage() {
  return (
    <CoinFlipTemplateWithWeb3
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      minWager={0.1}
      maxWager={2000}
    />
  );
}
