"use client";

import { RouletteTemplateWithWeb3 } from "@winrlabs/web3-games";

export default function RoulettePage() {
  return (
    <RouletteTemplateWithWeb3 minWager={0.1} maxWager={2000} options={{}} />
  );
}
