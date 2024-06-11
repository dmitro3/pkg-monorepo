"use client";

import { CoinFlipTemplateWithWeb3 } from "@winrlabs/web3-games";
import { useClient, useConnect } from "wagmi";
import { reconnect } from "wagmi/actions";
import { config } from "../wagmi";
import { useEffect } from "react";

export default function CoinFlipPage() {
  return (
    <CoinFlipTemplateWithWeb3
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      minWager={0.1}
      maxWager={2000}
    />
  );
}
