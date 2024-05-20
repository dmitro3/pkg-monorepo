"use client";

import React from "react";
import {
  SingleBJActiveGameHands,
  SingleBJGameStruct,
  SingleBlackjackGameStatus,
  SingleBlackjackTemplate,
} from "@winrlabs/games";

const defaultActiveGameHands = {
  dealer: {
    cards: null,
    hand: null,
  },
  firstHand: {
    cards: null,
    hand: null,
  },
  splittedFirstHand: {
    cards: null,
    hand: null,
  },
};

const defaultGameData = {
  activeHandIndex: 0,
  canInsure: false,
  status: SingleBlackjackGameStatus.NONE,
};

const mockActiveGameHands = {
  dealer: {
    cards: {
      cards: [13, 9, 12, 5, 4, 8, 0, 0],
      amountCards: 1,
      totalCount: 13,
      isSoftHand: false,
      canSplit: false,
    },
    hand: null,
  },
  firstHand: {
    cards: {
      cards: [13, 9, 12, 5, 4, 8, 0, 0],
      amountCards: 2,
      totalCount: 22,
      isSoftHand: false,
      canSplit: false,
    },
    hand: {
      chipsAmount: 12,
      isInsured: false,
      status: 1,
      isDouble: false,
      isSplitted: false,
      splittedHandIndex: 0,
    },
    handId: 1143,
    isCompleted: true,
  },
  splittedFirstHand: {
    cards: null,
    hand: null,
  },
};

const mockGameData = {
  activeHandIndex: 1143,
  canInsure: false,
  status: 1,
};

export default function SingleBlackjackPage() {
  const [activeGameData, setActiveGameData] =
    React.useState<SingleBJGameStruct>(defaultGameData);
  const [activeGameHands, setActiveGameHands] =
    React.useState<SingleBJActiveGameHands>(defaultActiveGameHands);
  const [initialDataFetched, setInitialDataFetched] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setActiveGameData(mockGameData);
      setActiveGameHands(mockActiveGameHands);

      setInitialDataFetched(true);
      setTimeout(() => setInitialDataFetched(false), 500);
    }, 2000);
  }, []);

  return (
    <SingleBlackjackTemplate
      activeGameData={activeGameData}
      activeGameHands={activeGameHands}
      onReset={() => {}}
      onDeal={() => {}}
      onDoubleDown={() => {}}
      onHit={() => {}}
      onInsure={() => {}}
      onSplit={() => {}}
      onStand={() => {}}
      onGameCompleted={() => {}}
      initialDataFetched={initialDataFetched}
      options={{}}
      minWager={2}
      maxWager={1000}
    />
  );
}
