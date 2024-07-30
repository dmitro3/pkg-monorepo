"use client";

import { BlackjackGame, LiveResults } from "@winrlabs/web3-games";

export default function BlackjackPage() {
  return (
    <>
      <BlackjackGame minWager={0.1} maxWager={2000} options={{}} />;
      <LiveResults />
    </>
  );
}
