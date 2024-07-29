"use client";

import { MinesGame } from "@winrlabs/web3-games";
import React from "react";

const MinesPage = () => {
  return (
    <MinesGame
      maxWager={100}
      minWager={1}
      onAnimationCompleted={() => {
        console.log("game completed");
      }}
    />
  );
};

export default MinesPage;
