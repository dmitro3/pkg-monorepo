"use client";

import { useAccount } from "wagmi";
import { BundlerMethods, useBundlerClient } from "./use-bundler-client";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { TypedJSONRPCClient } from "json-rpc-2.0";
import { SmartWalletConnectorWagmiType } from "../config/smart-wallet-connectors";
import { createContext, useContext, useMemo } from "react";

interface UseCurrentAccount {
  signerAddress?: Address;
  readerAddress?: Address;
  isGettingAddress?: boolean;
  isSmartWallet?: boolean;
}

const CurrentAccountContext = createContext<UseCurrentAccount>({
  signerAddress: undefined,
  readerAddress: undefined,
  isGettingAddress: false,
});

export const useCurrentAccount = () => {
  const currentAccount = useContext(CurrentAccountContext);
  return currentAccount;
};

const fetchCurrentUserAddress = async (
  client?: TypedJSONRPCClient<BundlerMethods>,
  address?: `0x${string}` | undefined,
  isSmartWallet?: boolean
) => {
  if (!client || !address) return undefined;

  const smartWalletAddress = await client?.request(
    "accountAbstraction.address",
    {
      owner: address,
    }
  );
  return isSmartWallet ? smartWalletAddress.account : address;
};

export const CurrentAccountProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { address, connector, isConnecting } = useAccount();
  const { client, isLoading: isClientLoading } = useBundlerClient();

  const isSmartWallet = useMemo(
    () => connector?.type === SmartWalletConnectorWagmiType,
    [connector]
  );

  const { data: currentUserAddress, isFetching: isGettingAddress } = useQuery({
    queryKey: ["currentUserAddress", address, isSmartWallet],
    queryFn: () =>
      fetchCurrentUserAddress(
        client,
        address,
        connector?.type === SmartWalletConnectorWagmiType
      ),
    enabled: !!address && !!client && !!connector?.type,
  });

  return (
    <CurrentAccountContext.Provider
      value={{
        readerAddress: currentUserAddress,
        signerAddress: address,
        isGettingAddress: isGettingAddress || isClientLoading || isConnecting,
        isSmartWallet,
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};
