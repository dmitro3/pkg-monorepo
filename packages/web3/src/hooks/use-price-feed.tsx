"use client";

import React from "react";
import { useTokenStore } from "../providers/token";
import { Address } from "viem";

interface PriceFeed {
  [address: Address]: number;
}

export const usePriceFeed = () => {
  const [priceFeed, setPriceFeed] = React.useState<PriceFeed>({});

  const tokens = useTokenStore((s) => s.tokens);

  React.useEffect(() => {
    // FIXME: mock response
    const payload: Record<Address, number> = {};

    tokens.forEach((t) => {
      payload[t.address] = 1;
    });

    setPriceFeed(payload);
  }, []);

  const getPrice = (address: Address): number => {
    return priceFeed[address] || 1;
  };

  return {
    priceFeed,
    getPrice,
  };
};
