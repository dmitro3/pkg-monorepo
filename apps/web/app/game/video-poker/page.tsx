"use client";

import { VideoPokerGame, Web3GamesModals } from "@winrlabs/web3-games";

export default function VideoPokerPage() {
  return (
    <>
      <VideoPokerGame minWager={0.1} maxWager={2000} />
      <Web3GamesModals />
    </>
  );
}
