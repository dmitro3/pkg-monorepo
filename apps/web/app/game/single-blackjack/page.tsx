"use client";

import { GameType } from "@winrlabs/games";
import { BetHistory, SingleBlackjackGame } from "@winrlabs/web3-games";

export default function SingleBlackjackPage() {
  return (
    <>
      <SingleBlackjackGame minWager={0.1} maxWager={2000} options={{}} />
      <BetHistory gameType={GameType.ONE_HAND_BLACKJACK} />
    </>
  );
}
