"use client";

import { CoinFlipGameResult, CoinSide } from "@winrlabs/games";
import { useState } from "react";
import { useConnect } from "wagmi";

export default function CoinFlipTemplate() {
  const [results, setResults] = useState<CoinFlipGameResult[]>([]);

  const { connectors, connect } = useConnect();

  return <>test</>;

  /*   return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  )); */
}
