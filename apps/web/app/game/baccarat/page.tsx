"use client";

import { BaccaratGame } from "@winrlabs/web3-games";
import React from "react";

export default function BaccaratPage() {
  return (
    <BaccaratGame
      minWager={0.1}
      maxWager={2000}
      onAnimationCompleted={() => {
        console.log("animation comp!");
      }}
    />
  );
}
