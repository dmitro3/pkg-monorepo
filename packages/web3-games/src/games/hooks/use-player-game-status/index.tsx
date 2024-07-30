"use client";

import { rankMiddlewareAbi, useCurrentAccount } from "@winrlabs/web3";
import React from "react";
import { Address } from "viem";
import { Config, useReadContract } from "wagmi";

import { useContractConfigContext } from "../use-contract-config";

interface IUsePlayerStatusParams {
  gameAddress: Address;
  wagmiConfig: Config;
}

interface PlayerStatusParams {
  isHalted: boolean;
  isRefundable: boolean;
  isReIterable: boolean;
}

const defaultValues = {
  isHalted: false,
  isRefundable: false,
  isReIterable: false,
};

export const usePlayerGameStatus = ({
  gameAddress,
  wagmiConfig,
}: IUsePlayerStatusParams) => {
  const [status, setStatus] = React.useState<PlayerStatusParams>(defaultValues);
  const { rankMiddlewareAddress } = useContractConfigContext();
  const currentAccount = useCurrentAccount();

  const playerLevelStatusRead = useReadContract({
    config: wagmiConfig,
    abi: rankMiddlewareAbi,
    address: rankMiddlewareAddress,
    account: currentAccount.address,
    functionName: "getPlayerStatus",
    args: [currentAccount.address || "0x"],
    query: {
      enabled: !!currentAccount.address,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });

  React.useEffect(() => {
    if (playerLevelStatusRead.data && playerLevelStatusRead.data.halted)
      setStatus((prev) => ({
        ...prev,
        isHalted: true,
      }));
  }, [playerLevelStatusRead.dataUpdatedAt]);

  return {};
};
