"use client";

import { useQuery } from "@tanstack/react-query";
import { JSONRPCClient, TypedJSONRPCClient } from "json-rpc-2.0";
import { createContext, useContext, ReactNode } from "react";
import { useAccount } from "wagmi";
import { UserOperation } from "../smart-wallet";
import { Hex } from "viem";

interface UseBundlerClient {
  client?: TypedJSONRPCClient<BundlerMethods>;
  isLoading: boolean;
  error?: Error;
}

const BundlerClientContext = createContext<UseBundlerClient>({
  client: undefined,
  isLoading: false,
  error: undefined,
});

export const useBundlerClient = () => {
  return useContext(BundlerClientContext);
};

export type BundlerMethods = {
  "preparePaymasterAndData"(params: { callData?: Hex }): {
    paymaster: string;
    paymasterData?: Hex;
    paymasterVerificationGasLimit: number;
    paymasterPostOpGasLimit: number;
  };

  "sendUserOperation"(params: Partial<UserOperation>): {
    hash: Hex;
    status: string;
  };
};

interface JSONPCClientRequestParams {
  walletAddress?: `0x${string}`;
  rpcUrl: string;
}

export type WinrBundlerClient = TypedJSONRPCClient<BundlerMethods>;

const fetchBundlerClient = async ({
  rpcUrl,
  walletAddress,
}: JSONPCClientRequestParams): Promise<WinrBundlerClient> => {
  console.log("fetching");

  if (!walletAddress) {
    console.log("Wallet address is required");

    throw new Error("Wallet address is required");
  }

  const client: WinrBundlerClient | undefined = new JSONRPCClient(
    (jsonRPCRequest) =>
      fetch(rpcUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-owner": walletAddress,
        },
        body: JSON.stringify(jsonRPCRequest),
      })
        .then((response) => {
          console.log("response", response);

          if (response.status === 200) {
            return response.json().then((jsonRPCResponse) => {
              console.log("jsonRPCResponse", jsonRPCResponse);

              return client?.receive(jsonRPCResponse);
            });
          } else if (jsonRPCRequest.id !== undefined) {
            console.log(
              "Error fetching JSON-RPC response",
              response.statusText
            );

            return Promise.reject(new Error(response.statusText));
          }
        })
        .catch((e) => {
          console.log("Error fetching JSON-RPC response", e);
          throw e;
        })
  );

  return client;
};

export const BundlerClientProvider: React.FC<{
  children: ReactNode;
  rpcUrl: string;
}> = ({ children, rpcUrl }) => {
  const { address } = useAccount();

  const {
    data: client,
    error,
    isLoading,
  } = useQuery<WinrBundlerClient>({
    queryKey: ["bundler-client", address],
    queryFn: () =>
      fetchBundlerClient({
        rpcUrl,
        walletAddress: address,
      }),
    enabled: !!address && !!rpcUrl,
  });

  return (
    <BundlerClientContext.Provider
      value={{
        client,
        isLoading,
        error: error as unknown as Error | undefined,
      }}
    >
      {children}
    </BundlerClientContext.Provider>
  );
};
