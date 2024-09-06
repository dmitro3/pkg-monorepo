import { Address, encodeFunctionData } from 'viem';
import { useReadContract } from 'wagmi';

import { erc20Abi, wrappedWinrAbi } from '../abis';
import { useTokenStore } from '../providers/token';
import { useSendTx } from './transaction';
import { useNativeTokenBalance } from './use-native-token-balance';
import { useTokenBalances, WRAPPED_WINR_BANKROLL } from './use-token-balances';

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

  const { data: amount } = useReadContract({
    address: wrappedWinr?.address || '0x',
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [account],
    query: {
      enabled: !!account && !!wrappedWinr?.address,
    },
  });

  const nativeWinr = useNativeTokenBalance({ account });

  const sendTx = useSendTx();

  const unwrapWinrTx = async () => {
    if (!amount || amount <= 0) return;

    await sendTx.mutateAsync({
      encodedTxData: encodeFunctionData({
        abi: wrappedWinrAbi,
        functionName: 'withdraw',
        args: [amount || 0n],
      }),
      target: wrappedWinr?.address,
    });

    nativeWinr.refetch();
    updateBalances();
  };

  return unwrapWinrTx;
};
