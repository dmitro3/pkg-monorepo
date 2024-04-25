"use client";

import { GameProvider } from "@winrlabs/games";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GameProvider
      options={{
        currency: {
          icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
          name: "Winr",
          symbol: "WINR",
        },
        account: {
          balance: 1000,
        },
      }}
    >
      {children}
    </GameProvider>
  );
};
