"use client";

import { useAccount } from "wagmi";
import { useBundlerClient } from "./use-bundler-client";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { SmartWalletConnectorWagmiType } from "../config/smart-wallet-connectors";
import { createContext, useContext, useMemo } from "react";
import { SimpleAccountAPI } from "../smart-wallet";
import { useSmartAccountApi } from "./use-smart-account-api";

interface UseCurrentAccount {
  rootAddress?: Address;
  address?: Address;
  isGettingAddress?: boolean;
  isSmartWallet?: boolean;
}

const CurrentAccountContext = createContext<UseCurrentAccount>({
  rootAddress: undefined,
  address: undefined,
  isGettingAddress: false,
  isSmartWallet: false,
});

export const useCurrentAccount = () => {
  const currentAccount = useContext(CurrentAccountContext);
  return currentAccount;
};

const fetchCurrentUserAddress = async (
  accountApi?: SimpleAccountAPI,
  address?: `0x${string}` | undefined,
  isSmartWallet?: boolean
) => {
  if (!address) return undefined;

  const smartWalletAddress = await accountApi?.getAccountAddress();

  return isSmartWallet ? smartWalletAddress : address;
};

export const CurrentAccountProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { address, connector, isConnecting } = useAccount();
  const { isLoading: isClientLoading } = useBundlerClient();
  const { accountApi } = useSmartAccountApi();

  const { data: currentUserAddress, isFetching: isGettingAddress } = useQuery({
    queryKey: [
      "currentUserAddress",
      address,
      connector?.type === SmartWalletConnectorWagmiType,
    ],
    queryFn: () =>
      fetchCurrentUserAddress(
        accountApi,
        address,
        connector?.type === SmartWalletConnectorWagmiType
      ),
    enabled: !!address && !!connector?.type && !!accountApi,
  });

  return (
    <CurrentAccountContext.Provider
      value={{
        address: currentUserAddress,
        rootAddress: address,
        isGettingAddress: isGettingAddress || isClientLoading || isConnecting,
        isSmartWallet: connector?.type === SmartWalletConnectorWagmiType,
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};
