"use client";

import { BlackjackGameStatus, BlackjackTemplate } from "@winrlabs/games";
import { useState } from "react";

const defaultActiveGameHands = {
  dealer: {
    cards: null,
    hand: null,
  },
  firstHand: {
    cards: null,
    hand: null,
  },
  secondHand: {
    cards: null,
    hand: null,
  },
  thirdHand: {
    cards: null,
    hand: null,
  },
  splittedFirstHand: {
    cards: null,
    hand: null,
  },
  splittedSecondHand: {
    cards: null,
    hand: null,
  },
  splittedThirdHand: {
    cards: null,
    hand: null,
  },
};

const defaultGameData = {
  activeHandIndex: 0,
  canInsure: false,
  status: BlackjackGameStatus.NONE,
};

export default function BlackjackPage() {
  return (
    <BlackjackTemplate
      activeGameData={defaultGameData}
      activeGameHands={defaultActiveGameHands}
      options={{}}
    />
  );
}
