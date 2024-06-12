"use client";

import {
  BaccaratGameResult,
  BaccaratGameSettledResult,
  BaccaratTemplate,
} from "@winrlabs/games";
import React from "react";

const baccaratResult = {
  bankerHand: {
    hasThirdCard: true,
    firstCard: 8,
    secondCard: 3,
    thirdCard: 12,
  },
  playerHand: {
    hasThirdCard: false,
    firstCard: 5,
    secondCard: 2,
    thirdCard: 8,
  },
};

const baccaratSettled = {
  won: true,
  wager: 7,
  payout: 10,
};

export default function BaccaratPage() {
  const [result, setResult] = React.useState<BaccaratGameResult | null>(null);
  const [settled, setSettled] =
    React.useState<BaccaratGameSettledResult | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setResult(baccaratResult);

      setSettled(baccaratSettled);
    }, 3000);
  }, []);

  return (
    <BaccaratTemplate
      minWager={0.1}
      maxWager={2000}
      baccaratResults={result}
      baccaratSettledResults={settled}
      onSubmitGameForm={() => {}}
    />
  );
}
