"use client";

import React from "react";

import {
  GameType,
  HoldemPokerActiveGame,
  HoldemPokerTemplate,
} from "@winrlabs/games";
import { BetHistory } from "@winrlabs/web3-games";

const defaultActiveGame: HoldemPokerActiveGame = {
  gameIndex: null,
  cards: [],
  anteChipAmount: 0,
  aaBonusChipAmount: 0,

  player: {
    combination: 0,
    cards: [],
  },

  dealer: {
    combination: 0,
    cards: [],
  },
  payoutAmount: 0,
  paybackAmount: 0,
  result: 0,
};

export default function HoldemPokerPage() {
  const [activeGame, setActiveGame] =
    React.useState<HoldemPokerActiveGame>(defaultActiveGame);

  return (
    <>
      <HoldemPokerTemplate
        minWager={0.1}
        maxWager={100}
        buildedGameUrl={process.env.NEXT_PUBLIC_BASE_CDN_URL || ""}
        activeGameData={activeGame}
        isInitialDataFetched={true}
        isLoggedIn={true}
        handleDeal={async () => {}}
        handleFinalize={async () => {}}
        handleFinalizeFold={async () => {}}
        onRefresh={() => {}}
        onFormChange={(v) => {
          console.log(v, "values");
        }}
      />

      <BetHistory gameType={GameType.HOLDEM_POKER} />
    </>
  );
}
