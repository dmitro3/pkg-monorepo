"use client";

import { Config, useAccount, useConfig, useWriteContract } from "wagmi";
import React, { useState } from "react";
import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  EncodeFunctionDataParameters,
  decodeErrorResult,
  encodeFunctionData,
} from "viem";
import { errorFactoryAbi } from "../abis";
import { WriteContractVariables } from "wagmi/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSmartAccountApi } from "./use-smart-account-api";
import { useCurrentAccount } from "./use-current-address";
import { useBundlerClient } from "./use-bundler-client";

export interface UseHandleTxOptions {
  successMessage?: string;
  successCb?: () => void;
  errorCb?: (e?: any) => void;
  confirmations?: number;
  showDefaultToasts?: boolean;
}

interface UseHandleTxParams<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  >,
  config extends Config,
  chainId extends config["chains"][number]["id"],
  ///
  allFunctionNames = ContractFunctionName<abi, "nonpayable" | "payable">,
> {
  writeContractVariables: WriteContractVariables<
    abi,
    functionName,
    args,
    config,
    chainId,
    allFunctionNames
  >;
  options: UseHandleTxOptions;
}

export const useHandleTx = <
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  >,
  config extends Config,
  chainId extends config["chains"][number]["id"],
  ///
  allFunctionNames = ContractFunctionName<abi, "nonpayable" | "payable">,
>(
  params: UseHandleTxParams<
    abi,
    functionName,
    args,
    config,
    chainId,
    allFunctionNames
  >
) => {
  const { writeContractVariables, options } = params;
  const { accountApi } = useSmartAccountApi();
  const { isSmartWallet } = useCurrentAccount();
  const { client } = useBundlerClient();

  const cachedUserOp = useQuery({
    queryKey: [
      "cachedSignature",
      writeContractVariables.functionName,
      writeContractVariables.args,
      writeContractVariables.account,
      writeContractVariables.address,
      isSmartWallet,
    ],
    queryFn: async () => {
      if (!isSmartWallet) return;
      const encodedData = encodeFunctionData<abi, functionName>({
        abi: writeContractVariables.abi,
        functionName: writeContractVariables.functionName,
        args: writeContractVariables.args,
      } as EncodeFunctionDataParameters<abi, functionName>);

      const userOp = await accountApi?.createSignedUserOp({
        target: writeContractVariables.address as Address,
        data: encodedData,
      });
      return userOp;
    },
    enabled:
      !!accountApi ||
      !!writeContractVariables.address ||
      !!writeContractVariables.args ||
      !!writeContractVariables.functionName ||
      !!isSmartWallet,

    refetchInterval: 10000,
  });

  const { writeContractAsync } = useWriteContract<config>();

  const handleTxMutation = useMutation({
    mutationFn: async () => {
      if (isSmartWallet) {
        if (!cachedUserOp.data) throw new Error("No cached signature");
        if (!client) return;
        const { status } = await client.request("sendUserOperation", {
          ...cachedUserOp.data,
        });

        if (status !== "success") {
          throw new Error(status);
        }
      } else {
        return await writeContractAsync<abi, functionName, args, chainId>({
          abi: writeContractVariables.abi,
          address: writeContractVariables.address,
          functionName: writeContractVariables.functionName,
          account: writeContractVariables.account,
          args: writeContractVariables.args,
          chainId: writeContractVariables.chainId,
          connector: writeContractVariables.connector,
          dataSuffix: writeContractVariables.dataSuffix,
          value: writeContractVariables.value,
          __mode: writeContractVariables.__mode,
        } as WriteContractVariables<abi, functionName, args, config, chainId>);
      }
    },
  });

  return handleTxMutation;
};
