"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "./wagmi";
import { WinrLabsWeb3Provider } from "@winrlabs/web3";
import { AudioContextProvider, GameProvider } from "@winrlabs/games";
import { AppUiProviders } from "@winrlabs/ui";
import { GameSocketProvider } from "@winrlabs/web3-games";
import { Address } from "viem";

const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";
const bundlerWsUrl = process.env.NEXT_PUBLIC_BUNDLER_WS_URL || "";
const entryPointAddress = (process.env.NEXT_PUBLIC_ENTRYPOINT_ADDRESS ||
  "") as Address;
const factoryAddress = (process.env.NEXT_PUBLIC_FACTORY_ADDRESS ||
  "") as Address;

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider reconnectOnMount config={config}>
      <QueryClientProvider client={queryClient}>
        <WinrLabsWeb3Provider
          smartAccountConfig={{
            bundlerUrl,
            entryPointAddress,
            factoryAddress,
          }}
        >
          <AppUiProviders
            wagmiConfig={config}
            appTokens={[
              {
                tokenAddress: "0x031C21aC79baac1E6AD074ea63ED9e9a318cab26",
                displayDecimals: 6,
                tokenDecimals: 18,
                icon: "https://assets.coingecko.com/coins/images/325/standard/wETH.png?1696501661",
                tokenSymbol: "wETH",
              },
            ]}
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
              <GameSocketProvider bundlerWsUrl={bundlerWsUrl}>
                <AudioContextProvider>{props.children}</AudioContextProvider>
              </GameSocketProvider>
            </GameProvider>
          </AppUiProviders>
        </WinrLabsWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
