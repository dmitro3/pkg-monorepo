"use client";

import { SingleBlackjackGame, Web3GamesModals } from "@winrlabs/web3-games";

export default function SingleBlackjackPage() {
  return (
    <>
      <SingleBlackjackGame minWager={0.1} maxWager={2000} options={{}} />
      <Web3GamesModals />
    </>
  );
}
