"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "./wagmi";
import { WinrLabsWeb3Provider } from "@winrlabs/web3";
import { AudioContextProvider, GameProvider } from "@winrlabs/games";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WinrLabsWeb3Provider rpcUrl="https://jb-onchain-suppliers-development-u4m2y.ondigitalocean.app/rpc">
          <GameProvider
            options={{
              currency: {
                icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
                name: "Winr",
                symbol: "WINR",
              },
              account: {
                isLoggedIn: true,
                balance: 25,
              },
            }}
          >
            <AudioContextProvider>{props.children}</AudioContextProvider>
          </GameProvider>
        </WinrLabsWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
