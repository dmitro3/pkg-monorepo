import { Address, encodeFunctionData } from 'viem';

import { wrappedWinrAbi } from '../abis';
import { useTokenStore } from '../providers/token';
import { useSendTx } from './transaction';
import { useNativeTokenBalance } from './use-native-token-balance';
import { useTokenBalances, WRAPPED_WINR_BANKROLL } from './use-token-balances';

interface IUseWrapWinr {
  account: Address;
}

export const useWrapWinr = ({ account }: IUseWrapWinr) => {
  const tokens = useTokenStore((s) => s.tokens);
  const wrappedWinr = tokens.find((t) => t.bankrollIndex == WRAPPED_WINR_BANKROLL);
  const nativeWinr = useNativeTokenBalance({ account });
  const { refetch: updateBalances } = useTokenBalances({
    account,
    balancesToRead: [wrappedWinr?.address || '0x'],
  });

  const sendTx = useSendTx();

  const wrapWinr = async () => {
    if (!nativeWinr.balanceAsBigInt || nativeWinr.balanceAsBigInt <= 0) return;

    await sendTx.mutateAsync({
      encodedTxData: encodeFunctionData({
        abi: wrappedWinrAbi,
        functionName: 'deposit',
        args: [],
      }),
      target: wrappedWinr?.address,
    });

    nativeWinr.refetch();
    updateBalances();
  };

  return wrapWinr;
};
