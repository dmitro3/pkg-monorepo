"use client";

import React from "react";
import { LimboTemplateWithWeb3 } from "@winrlabs/web3-games";

const LimboPage = () => {
  return (
    <LimboTemplateWithWeb3
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

export default LimboPage;
