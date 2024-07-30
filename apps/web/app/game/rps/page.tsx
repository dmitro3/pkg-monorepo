"use client";

import { LiveResults, RpsGame } from "@winrlabs/web3-games";

const RpsPage = () => {
  return (
    <>
      <RpsGame
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        minWager={0.1}
        maxWager={2000}
      />
      <LiveResults />
    </>
  );
};

export default RpsPage;
