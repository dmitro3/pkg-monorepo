"use client";

import { RpsTemplateWithWeb3 } from "@winrlabs/web3-games";

const RpsPage = () => {
  return (
    <RpsTemplateWithWeb3
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      minWager={0.1}
      maxWager={2000}
    />
  );
};

export default RpsPage;
