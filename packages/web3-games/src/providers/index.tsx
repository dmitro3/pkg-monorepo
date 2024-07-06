import { GameProvider } from "@winrlabs/games";
import { GameSocketProvider } from "../games/hooks";
import {
  ContractConfig,
  ContractConfigProvider,
} from "../games/hooks/use-contract-config";
import { Config } from "wagmi";

import { Token, useTokenStore, useBalanceStore } from "@winrlabs/web3";
import { useEffect } from "react";
import { Address } from "viem";

type WinrLabsWeb3GamesConfig = {
  wagmiConfig: Config;
  bundlerWsUrl: string;
  contracts: ContractConfig;
};

type WinrLabsWeb3GamesProviderProps = {
  children: React.ReactNode;
  config: WinrLabsWeb3GamesConfig;
  tokens: Token[];
  defaultSelectedTokenAddress?: Address;
};

export const WinrLabsWeb3GamesProvider = ({
  children,
  config,
  tokens,
  defaultSelectedTokenAddress,
}: WinrLabsWeb3GamesProviderProps) => {
  const { updateState } = useTokenStore();

  useEffect(() => {
    updateState({
      tokens,
    });
  }, [tokens]);

  useEffect(() => {
    if (defaultSelectedTokenAddress && tokens) {
      updateState({
        selectedToken: tokens.find(
          (token) => token.address === defaultSelectedTokenAddress
        ),
      });
    }
  }, [defaultSelectedTokenAddress, tokens]);

  return (
    <ContractConfigProvider
      wagmiConfig={config.wagmiConfig}
      config={config.contracts}
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
        <GameSocketProvider bundlerWsUrl={config.bundlerWsUrl}>
          {children}
        </GameSocketProvider>
      </GameProvider>
    </ContractConfigProvider>
  );
};
