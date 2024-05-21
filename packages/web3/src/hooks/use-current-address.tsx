"use client";

import { useAccount } from "wagmi";
import { BundlerMethods, useBundlerClient } from "./use-bundler-client";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { TypedJSONRPCClient } from "json-rpc-2.0";
import { AccountAbstractionConnectorWagmiType } from "../config/aa-connectors";
import { createContext, useContext, useMemo } from "react";

interface UseCurrentAccount {
  address?: Address;
  isGettingAddress?: boolean;
  isSmartWallet?: boolean;
}

const CurrentAccountContext = createContext<UseCurrentAccount>({
  address: undefined,
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
    () => connector?.type === AccountAbstractionConnectorWagmiType,
    [connector]
  );

  const { data: currentUserAddress, isFetching: isGettingAddress } = useQuery({
    queryKey: ["currentUserAddress", address, isSmartWallet],
    queryFn: () => fetchCurrentUserAddress(client, address, true),
    enabled: !!client && !!address && isSmartWallet,
  });

  return (
    <CurrentAccountContext.Provider
      value={{
        address: currentUserAddress,
        isGettingAddress: isGettingAddress || isClientLoading || isConnecting,
        isSmartWallet,
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};
