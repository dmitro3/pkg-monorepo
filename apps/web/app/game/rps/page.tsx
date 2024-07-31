"use client";

import { LiveResults, RpsGame, Web3GamesModals } from "@winrlabs/web3-games";

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
      <Web3GamesModals />
    </>
  );
};

export default RpsPage;
