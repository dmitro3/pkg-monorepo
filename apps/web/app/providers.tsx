"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "./wagmi";
import { WinrLabsWeb3Provider } from "@winrlabs/web3";
import { AudioContextProvider } from "@winrlabs/games";
import { AppUiProviders } from "@winrlabs/ui";
import { WinrLabsWeb3GamesProvider } from "@winrlabs/web3-games";
import { Address } from "viem";

const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";
const bundlerWsUrl = process.env.NEXT_PUBLIC_BUNDLER_WS_URL || "";
export const entryPointAddress = process.env
  .NEXT_PUBLIC_ENTRYPOINT_ADDRESS as Address;
export const factoryAddress = process.env
  .NEXT_PUBLIC_FACTORY_ADDRESS as Address;

export const controllerAddress = process.env
  .NEXT_PUBLIC_CONTROLLER_ADDRESS as Address;
export const cashierAddress = process.env
  .NEXT_PUBLIC_CASHIER_ADDRESS as Address;
export const uiOperatorAddress = process.env
  .NEXT_PUBLIC_UI_OPERATOR_ADDRESS as Address;

export const gameAddresses = {
  coinFlip: process.env.NEXT_PUBLIC_COIN_FLIP_ADDRESS as Address,
  plinko: process.env.NEXT_PUBLIC_PLINKO_ADDRESS as Address,
  limbo: process.env.NEXT_PUBLIC_LIMBO_ADDRESS as Address,
  rps: process.env.NEXT_PUBLIC_RPS_ADDRESS as Address,
  roll: process.env.NEXT_PUBLIC_ROLL_ADDRESS as Address,
  dice: process.env.NEXT_PUBLIC_DICE_ADDRESS as Address,
  roulette: process.env.NEXT_PUBLIC_ROULETTE_ADDRESS as Address,
  baccarat: process.env.NEXT_PUBLIC_BACCARAT_ADDRESS as Address,
  keno: process.env.NEXT_PUBLIC_KENO_ADDRESS as Address,
  wheel: process.env.NEXT_PUBLIC_WHEEL_ADDRESS as Address,
  winrBonanza: process.env.NEXT_PUBLIC_WINR_BONANZA_ADDRESS as Address,
  videoPoker: process.env.NEXT_PUBLIC_VIDEO_POKER_ADDRESS as Address,
};

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isPreviouslyConnected, setIsPreviouslyConnected] = useState(false);

  useEffect(() => {
    if (!localStorage) return;
    setIsPreviouslyConnected(localStorage["isConnected"]);
  }, []);

  return (
    <WagmiProvider reconnectOnMount={isPreviouslyConnected} config={config}>
      <QueryClientProvider client={queryClient}>
        <WinrLabsWeb3Provider
          smartAccountConfig={{
            bundlerUrl,
            entryPointAddress,
            factoryAddress,
          }}
          tokens={[
            {
              address: "0x4b45108FfBb6d87aEAF59aCeeADb205C605F3125",
              displayDecimals: 6,
              decimals: 18,
              icon: "/tokens/weth.png",
              symbol: "wETH",
              playable: true,
            },
            {
              address: "0x4b45108FfBb6d87aEAF59aCeeADb205C605F3125",
              displayDecimals: 6,
              decimals: 18,
              icon: "/tokens/weth.png",
              symbol: "wETH",
              playable: true,
            },
          ]}
          selectedToken={{
            address: "0x4b45108FfBb6d87aEAF59aCeeADb205C605F3125",
            displayDecimals: 6,
            decimals: 18,
            icon: "/tokens/weth.png",
            symbol: "wETH",
            playable: true,
          }}
        >
          <AppUiProviders wagmiConfig={config}>
            <WinrLabsWeb3GamesProvider
              config={{
                wagmiConfig: config,
                bundlerWsUrl,
                contracts: {
                  gameAddresses,
                  controllerAddress,
                  cashierAddress,
                  uiOperatorAddress,
                },
              }}
            >
              <AudioContextProvider>{props.children}</AudioContextProvider>
            </WinrLabsWeb3GamesProvider>
          </AppUiProviders>
        </WinrLabsWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
