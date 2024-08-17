"use client";

import {
  BundlerClientProvider,
  BundlerNetwork,
} from "../hooks/use-bundler-client";
import { CurrentAccountProvider } from "../hooks/use-current-address";
import { SmartAccountApiProvider } from "../hooks/use-smart-account-api";
import { Token, TokenProvider } from "./token";

export const WinrLabsWeb3Provider = ({
  children,
  smartAccountConfig,
  tokens,
  selectedToken,
}: {
  children: React.ReactNode;
  smartAccountConfig: {
    bundlerUrl: string;
    entryPointAddress: `0x${string}`;
    factoryAddress: `0x${string}`;
    network: BundlerNetwork;
    paymasterAddress: `0x${string}`;
  };
  tokens: Token[];
  selectedToken: Token;
}) => {
  return (
    <BundlerClientProvider
      rpcUrl={smartAccountConfig.bundlerUrl}
      initialNetwork={smartAccountConfig.network}
    >
      <SmartAccountApiProvider
        entryPointAddress={smartAccountConfig.entryPointAddress}
        factoryAddress={smartAccountConfig.factoryAddress}
        paymasterAddress={smartAccountConfig.paymasterAddress}
      >
        <TokenProvider tokens={tokens} selectedToken={selectedToken}>
          <CurrentAccountProvider>{children}</CurrentAccountProvider>
        </TokenProvider>
      </SmartAccountApiProvider>
    </BundlerClientProvider>
  );
};
