"use client";

import {
  BlackjackGame,
  LiveResults,
  Web3GamesModals,
} from "@winrlabs/web3-games";

export default function BlackjackPage() {
  return (
    <>
      <BlackjackGame minWager={0.1} maxWager={2000} options={{}} />;
      <LiveResults />
      <Web3GamesModals />
    </>
  );
}
