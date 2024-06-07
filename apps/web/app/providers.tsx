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
        <WinrLabsWeb3Provider
          smartAccountConfig={{
            bundlerUrl:
              "https://game-hub-production-ssmnd.ondigitalocean.app/rpc",
            entryPointAddress: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
            factoryAddress: "0x12a4F339F74c08F23D8033dF4457eC253DC9AdC0",
          }}
        >
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
