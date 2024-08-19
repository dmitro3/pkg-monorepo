'use client';

import { JSONRPCClient } from 'json-rpc-2.0';
import React from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

import { SmartWalletConnectorWagmiType } from '../config/smart-wallet-connectors';
import { PaymasterAPI, PaymasterParams, SimpleAccountAPI, UserOperation } from '../smart-wallet';
import { useBundlerClient } from './use-bundler-client';

export class Paymaster implements PaymasterAPI {
  client: JSONRPCClient;
  paymasterAddress: `0x${string}`;

  constructor(client: JSONRPCClient, paymasterAddress: `0x${string}`) {
    this.client = client;
    this.paymasterAddress = paymasterAddress;
  }

  async getPaymasterData(userOp: Partial<UserOperation>): Promise<PaymasterParams> {
    try {
      // const paymasterParams = await this.client.request(
      //   "preparePaymasterAndData",
      //   {
      //     callData: userOp.callData,
      //   }
      // );

      return {
        paymaster: this.paymasterAddress,
        paymasterData: '0x',
        paymasterVerificationGasLimit: BigInt(200000),
        paymasterPostOpGasLimit: BigInt(0),
      };
    } catch (err) {
      console.log('PAYMASTER ERROR', err);

      return null as unknown as PaymasterParams;
    }
  }
}

interface UseSmartAccountApi {
  accountApi?: SimpleAccountAPI;
}

const SmartAccountApiContext = React.createContext<UseSmartAccountApi>({
  accountApi: undefined,
});

export const useSmartAccountApi = () => {
  const accountApi = React.useContext(SmartAccountApiContext);

  return accountApi;
};

export const SmartAccountApiProvider: React.FC<{
  children: React.ReactNode;
  entryPointAddress: `0x${string}`;
  factoryAddress: `0x${string}`;
  paymasterAddress: `0x${string}`;
}> = ({ children, entryPointAddress, factoryAddress, paymasterAddress }) => {
  const { address, connector } = useAccount();

  const { client } = useBundlerClient();

  const publicClient = usePublicClient();

  const { data: signer } = useWalletClient();

  const [accountApi, setAccountApi] = React.useState<SimpleAccountAPI | undefined>(undefined);

  React.useEffect(() => {
    if (!client || !address || !signer || !publicClient) return;

    const createSmartAccountApi = () => {
      const _accountApi = new SimpleAccountAPI({
        provider: publicClient,
        entryPointAddress,
        factoryAddress,
        owner: signer,
        index: BigInt(0),
        paymasterAPI: new Paymaster(client, paymasterAddress),
        overheads: {
          // perUserOp: 100000
        },
      });
      console.log('CREATE SMART ACCOUNT API', _accountApi);

      setAccountApi(_accountApi);
    };

    createSmartAccountApi();
  }, [client, address, signer, publicClient]);

  return (
    <SmartAccountApiContext.Provider value={{ accountApi }}>
      {children}
    </SmartAccountApiContext.Provider>
  );
};
