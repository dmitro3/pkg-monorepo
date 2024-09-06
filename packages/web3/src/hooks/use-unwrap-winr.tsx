import React from 'react';
import { Address, encodeFunctionData } from 'viem';
import { useReadContract } from 'wagmi';

import { erc20Abi, wrappedWinrAbi } from '../abis';
import { useTokenStore } from '../providers/token';
import { useHandleTx } from './use-handle-tx';
import { useNativeTokenBalance } from './use-native-token-balance';
import { useTokenBalances, WRAPPED_WINR_BANKROLL } from './use-token-balances';
import { useBalanceStore } from '../providers/balance';

interface IUseUnwrapWinr {
  account: Address;
}

export const useUnWrapWinr = ({ account }: IUseUnwrapWinr) => {
  const tokens = useTokenStore((s) => s.tokens);
  const wrappedWinr = tokens.find((t) => t.bankrollIndex == WRAPPED_WINR_BANKROLL);
  const { refetch: updateBalances } = useTokenBalances({
    account,
    balancesToRead: [wrappedWinr?.address || '0x'],
  });
  const { balances } = useBalanceStore();

  const { data: amount, refetch: refetchWrappedBalance } = useReadContract({
    address: wrappedWinr?.address || '0x',
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [account],
    query: {
      enabled: !!account && !!wrappedWinr?.address,
    },
  });

  const nativeWinr = useNativeTokenBalance({ account });

  const encodedTxData = React.useMemo(() => {
    if (!amount || !wrappedWinr) return '0x0';

    return encodeFunctionData({
      abi: wrappedWinrAbi,
      functionName: 'withdraw',
      args: [amount >= 10n ? amount - 10n : 1n],
    });
  }, [amount, wrappedWinr]);

  const unwrapTx = useHandleTx({
    writeContractVariables: {
      abi: wrappedWinrAbi,
      address: wrappedWinr?.address || '0x0',
      functionName: 'withdraw',
    },
    encodedTxData: encodedTxData,
    options: {},
  });

  React.useEffect(() => {
    refetchWrappedBalance();
  }, [balances[wrappedWinr?.address || '0x']]);

  const unwrapWinrTx = async () => {
    if (!amount || amount <= 100n) return;

    await unwrapTx.mutateAsync();
    nativeWinr.refetch();
    updateBalances();
  };

  return unwrapWinrTx;
};
