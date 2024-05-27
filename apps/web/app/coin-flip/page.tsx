"use client";

import { CoinFlipGameResult, CoinSide } from "@winrlabs/games";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import CoinFlipTemplate from "./template";

export default function CoinFlipPage() {
  const [results, setResults] = useState<CoinFlipGameResult[]>([]);

  return <CoinFlipTemplate />;
}
