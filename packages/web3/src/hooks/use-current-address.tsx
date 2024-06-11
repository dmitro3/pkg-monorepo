"use client";

import { useAccount } from "wagmi";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { SmartWalletConnectorWagmiType } from "../config/smart-wallet-connectors";
import React, { createContext, useContext, useMemo, useState } from "react";
import { SimpleAccountAPI } from "../smart-wallet";
import { useSmartAccountApi } from "./use-smart-account-api";

interface UseCurrentAccount {
  rootAddress?: Address;
  address?: Address;
  isGettingAddress?: boolean;
  isSmartWallet?: boolean;
  resetCurrentAccount?: () => void;
}

const initalState: UseCurrentAccount = {
  rootAddress: undefined,
  address: undefined,
  isGettingAddress: false,
  isSmartWallet: false,
  resetCurrentAccount: () => {},
};

const CurrentAccountContext = createContext<UseCurrentAccount>(initalState);

export const useCurrentAccount = () => {
  const currentAccount = useContext(CurrentAccountContext);
  return currentAccount;
};

const fetchCurrentUserAddress = async (
  accountApi?: SimpleAccountAPI,
  address?: `0x${string}` | undefined,
  isSmartWallet?: boolean
) => {
  console.log("fetchCurrentUserAddress", address, isSmartWallet);

  if (!address) return undefined;

  console.log("isSmartWallet", isSmartWallet);
  console.log("address", address);

  if (!isSmartWallet) return address;

  const smartWalletAddress = await accountApi?.getAccountAddress();

  return smartWalletAddress;
};

export const CurrentAccountProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { address, connector, isConnecting, status } = useAccount();
  const { accountApi } = useSmartAccountApi();
  const [currentAccount, setCurrentAccount] =
    useState<UseCurrentAccount>(initalState);

  // const [isGettingAddress, setIsGettingAddress] = useState<boolean>(false);

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

  React.useEffect(() => {
    console.log("Status", status);

    setCurrentAccount({
      rootAddress: address,
      address: currentUserAddress,
      isGettingAddress,
      isSmartWallet: connector?.type === SmartWalletConnectorWagmiType,
    });
  }, [
    address,
    currentUserAddress,
    isGettingAddress,
    connector?.type,
    isConnecting,
    status,
  ]);

  /*   console.log("currentUserAddress", currentUserAddress);
  console.log("address", address);
  console.log("connector", connector?.type); 

 /*  React.useEffect(() => {
    console.log("Status", status);

    console.log("address", address);

    // console.log("currentUserAddress", currentUserAddress);

    console.log(
      "isSmartWallet",
      connector?.type === SmartWalletConnectorWagmiType
    );

    setIsGettingAddress(true);

    const currentUser = async () => {
      const currentUserAddress = await fetchCurrentUserAddress(
        accountApi,
        address,
        connector?.type === SmartWalletConnectorWagmiType
      );

      setIsGettingAddress(false);

      setCurrentAccount({
        rootAddress: address,
        address: currentUserAddress,
        isGettingAddress: isGettingAddress,
        isSmartWallet: connector?.type === SmartWalletConnectorWagmiType,
      });
    };

    currentUser();
  }, [address, connector?.type, isConnecting, status]); */

  const resetCurrentAccount = () => {
    setCurrentAccount(initalState);
  };

  return (
    <CurrentAccountContext.Provider
      value={{ ...currentAccount, resetCurrentAccount }}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};
