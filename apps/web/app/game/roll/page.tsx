"use client";

import { LiveResults, RollGame, Web3GamesModals } from "@winrlabs/web3-games";
import React from "react";

const RollPage = () => {
  return (
    <>
      <RollGame
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        minWager={0.1}
        maxWager={2000}
      />
      <LiveResults />
      <Web3GamesModals />
    </>
  );
};

export default RollPage;
