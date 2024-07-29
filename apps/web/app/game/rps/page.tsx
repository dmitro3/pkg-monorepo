"use client";

import { RpsGame } from "@winrlabs/web3-games";

const RpsPage = () => {
  <RpsGame
    options={{
      scene: {
        backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
      },
    }}
    minWager={0.1}
    maxWager={2000}
  />;
};

export default RpsPage;
