"use client";

import { useQuery } from "@tanstack/react-query";
import { JSONRPCClient, TypedJSONRPCClient } from "json-rpc-2.0";
import { createContext, useContext, ReactNode } from "react";
import { useAccount } from "wagmi";

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
  "accountAbstraction.address"(params: { owner: `0x${string}` }): {
    account: `0x${string}`;
  };
  "accountAbstraction.create"(params: {
    details: {
      from: `0x${string}`;
      target: `0x${string}`;
      data: `0x${string}`;
      value?: bigint;
    };
  }): any;
  "accountAbstraction.send"(params: {
    from: `0x${string}`;
    signature: `0x${string}`;
  }): any;
  "accountAbstraction.refreshAccount"(params: { owner: `0x${string}` }): any;
};

interface JSONPCClientRequestParams {
  walletAddress?: `0x${string}`;
  rpcUrl: string;
}

const fetchBundlerClient = async ({
  rpcUrl,
  walletAddress,
}: JSONPCClientRequestParams): Promise<TypedJSONRPCClient<BundlerMethods>> => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }

  const client: TypedJSONRPCClient<BundlerMethods> | undefined =
    new JSONRPCClient((jsonRPCRequest) =>
      fetch(rpcUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-owner": walletAddress,
        },
        body: JSON.stringify(jsonRPCRequest),
      })
        .then((response) => {
          if (response.status === 200) {
            return response
              .json()
              .then((jsonRPCResponse) => client?.receive(jsonRPCResponse));
          } else if (jsonRPCRequest.id !== undefined) {
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
  } = useQuery<TypedJSONRPCClient<BundlerMethods>>({
    queryKey: ["bundler-client", address],
    queryFn: () =>
      fetchBundlerClient({
        rpcUrl,
        walletAddress: address,
      }),
    enabled: !!address,
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
