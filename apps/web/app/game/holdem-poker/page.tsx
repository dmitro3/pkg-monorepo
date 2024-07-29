"use client";

import React from "react";

import { HoldemPokerGame } from "@winrlabs/web3-games";

export default function HoldemPokerPage() {
  return (
    <HoldemPokerGame
      minWager={0.1}
      maxWager={100}
      buildedGameUrl={process.env.NEXT_PUBLIC_BASE_CDN_URL || ""}
    />
  );
}
