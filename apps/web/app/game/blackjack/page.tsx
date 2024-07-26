"use client";

import { GameType } from "@winrlabs/games";
import { BetHistory, BlackjackGame } from "@winrlabs/web3-games";

export default function BlackjackPage() {
  return (
    <>
      <BlackjackGame minWager={0.1} maxWager={2000} options={{}} />
      <BetHistory gameType={GameType.BLACKJACK} />
    </>
  );
}
