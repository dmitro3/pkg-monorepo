"use client";

import { DiceGame, LiveResults } from "@winrlabs/web3-games";

export default function DicePage() {
  return (
    <>
      <DiceGame
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
