"use client";

import { CoinFlipTemplateWithWeb3 } from "@winrlabs/web3-games";
import { useClient, useConnect } from "wagmi";
import { reconnect } from "wagmi/actions";
import { config } from "../wagmi";
import { useEffect } from "react";

export default function CoinFlipPage() {
  /*   const clientConfig = useClient();
  const { connectAsync, connectors } = useConnect();
  useEffect(() => {
    reconnect(config);
  }, [clientConfig, connectAsync, connectors]); */
  return <CoinFlipTemplateWithWeb3 />;
}
