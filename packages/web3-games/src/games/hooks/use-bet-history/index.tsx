'use client';

import {
  GameControllerGlobalBetHistoryResponse,
  useGameControllerGlobalBetHistory,
} from '@winrlabs/api';
import { GameType } from '@winrlabs/games';
import { BetHistoryCurrencyList, BetHistoryFilter } from '@winrlabs/games';
import { useCurrentAccount, useTokenStore } from '@winrlabs/web3';
import React from 'react';

interface IUseBetHistory {
  gameType: GameType;
  options?: {
    enabled?: boolean;
  };
}

export const useBetHistory = ({ gameType, options }: IUseBetHistory) => {
  const [filter, setFilter] = React.useState<BetHistoryFilter>({
    type: 'bets',
  });

  const { address } = useCurrentAccount();

  const defaultParams = {
    limit: 10,
    page: 1,
  };

  const { data, isLoading, refetch } = useGameControllerGlobalBetHistory(
    {
      queryParams:
        filter.type === 'player'
          ? {
              player: address,
              ...defaultParams,
            }
          : defaultParams,
    },
    {
      enabled: options?.enabled,
    }
  );

  const tokens = useTokenStore((s) => s.tokens);

  const mapTokens = React.useMemo(() => {
    return tokens.reduce((acc, token) => {
      acc[token.address] = {
        icon: token.icon,
        symbol: token.symbol,
      };
      return acc;
    }, {} as BetHistoryCurrencyList);
  }, [tokens]);

  return {
    betHistory: data as GameControllerGlobalBetHistoryResponse,
    isHistoryLoading: isLoading,
    mapHistoryTokens: mapTokens,
    historyFilter: filter,
    setHistoryFilter: setFilter,
    refetchHistory: refetch,
  };
};
