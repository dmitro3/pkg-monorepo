"use client";

import React from "react";
import { LimboGame, LiveResults, Web3GamesModals } from "@winrlabs/web3-games";

const LimboPage = () => {
  return (
    <>
      <LimboGame
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

export default LimboPage;
