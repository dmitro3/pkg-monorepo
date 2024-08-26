import { useMutation } from '@tanstack/react-query';
import { Hex } from 'viem';

import { MutationHook } from '../../utils/types';
import { useCurrentAccount } from '../use-current-address';
import { SendTxRequest } from './types';
import { useSocialAccountTx } from './use-social-account-tx';
import { useWeb3AccountTx } from './use-web3-account-tx';

export const useSendTx: MutationHook<SendTxRequest, { status: string; hash: Hex }> = (
  options = {}
) => {
  const { isSocialLogin } = useCurrentAccount();

  const { mutateAsync: sendSocialAccountTx } = useSocialAccountTx();

  const { mutateAsync: sendWeb3AccountTx } = useWeb3AccountTx();

  return useMutation({
    ...options,
    mutationFn: async (request) => {
      const {
        part,
        permit,
        method,
        target,
        encodedTxData,
        customAccountApi,
        value,
        customBundlerClient,
      } = request;

      if (isSocialLogin) {
        return await sendSocialAccountTx({
          target,
          customAccountApi,
          customBundlerClient,
          encodedTxData,
          method,
          value,
        });
      }

      return await sendWeb3AccountTx({
        part,
        permit,
        customAccountApi,
        customBundlerClient,
        target,
        encodedTxData,
        value,
      });
    },
  });
};
