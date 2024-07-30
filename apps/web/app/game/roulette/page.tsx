"use client";

import { RouletteGame, LiveResults } from "@winrlabs/web3-games";

export default function RoulettePage() {
  return (
    <>
      <RouletteGame minWager={0.1} maxWager={2000} options={{}} />;
      {/* <LiveResults /> */}
    </>
  );
}
