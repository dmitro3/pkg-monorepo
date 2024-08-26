import { useMutation } from '@tanstack/react-query';
import { Hex } from 'viem';

import { MutationHook } from '../../utils/types';
import { useBundlerClient } from '../use-bundler-client';
import { useCurrentAccount } from '../use-current-address';
import { BundlerClientNotFoundError } from './error';
import { Web3AccountTxRequest } from './types';

export const useWeb3AccountTx: MutationHook<Web3AccountTxRequest, { status: string; hash: Hex }> = (
  options = {}
) => {
  const { client: defaultClient } = useBundlerClient();

  const { address: userAddress } = useCurrentAccount();

  return useMutation({
    ...options,
    mutationFn: async (request) => {
      let client = request.customBundlerClient ? request.customBundlerClient : defaultClient;

      if (!client) {
        throw new BundlerClientNotFoundError();
      }

      return await client.request('call', {
        call: {
          dest: request.target ?? '0x0',
          data: request.encodedTxData ?? '0x0',
          value: request.value ?? 0,
        },
        owner: userAddress!,
        part: request.part ?? '0x',
        permit: request.permit ?? '0x',
      });
    },
  });
};
