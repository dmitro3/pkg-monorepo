import { useQuery } from '@tanstack/react-query';
import { Address, PublicClient, WalletClient } from 'viem';

import { SimpleAccountAPI } from '../smart-wallet';
import { BundlerNetwork, fetchBundlerClient } from './use-bundler-client';
import { Paymaster } from './use-smart-account-api';

interface UseCustomBundlerClient {
  publicClient: PublicClient;
  network: BundlerNetwork;
  signerAddress: Address;
  walletClient: WalletClient;
  entryPointAddress: Address;
  factoryAddress: Address;
  paymasterAddress: Address;
  rpcUrl: string;
}

export const useCustormBundler = ({
  publicClient,
  network,
  signerAddress,
  walletClient,
  entryPointAddress,
  factoryAddress,
  paymasterAddress,
  rpcUrl,
}: UseCustomBundlerClient) => {
  return useQuery({
    queryFn: async () => {
      const client = await fetchBundlerClient({
        network,
        rpcUrl,
        walletAddress: signerAddress,
      });

      const accountApi = new SimpleAccountAPI({
        provider: publicClient,
        entryPointAddress,
        factoryAddress,
        owner: walletClient,
        index: BigInt(0),
        paymasterAPI: new Paymaster(client, paymasterAddress),
        overheads: {
          // perUserOp: 100000
        },
      });

      return {
        client,
        accountApi,
      };
    },
    queryKey: ['customBundler', network, signerAddress],
    enabled: !!network && !!signerAddress && !!walletClient && !!publicClient,
  });
};
