'use client';

import {
  baseUrl,
  GameControllerGlobalBetHistoryResponse,
  useGameControllerBetHistory,
  useGameControllerGlobalBetHistory,
} from '@winrlabs/api';
import { GameType } from '@winrlabs/games';
import { BetHistoryCurrencyList, BetHistoryFilter } from '@winrlabs/games';
import { useCurrentAccount, useTokenStore } from '@winrlabs/web3';
import React, { useEffect } from 'react';

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

  const [globalBets, setGlobalBets] = React.useState<GameControllerGlobalBetHistoryResponse>([]);

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

  useEffect(() => {
    if (data) {
      setGlobalBets(data);
    }
  }, [data]);

  useEffect(() => {
    const es = new EventSource(baseUrl + '/game/sse-live-wins');

    es.onmessage = (event) => {
      if (!event.data) return;

      console.log('event.data', event.data);

      const newData = JSON.parse(String(event.data));

      setGlobalBets((prev) => {
        return [newData, ...prev.slice(0, 30)];
      });
    };

    return () => {
      es.close();
    };
  }, []);

  const {
    data: myBetsData,
    isLoading: myBetsIsLoading,
    refetch: refetchMyBets,
  } = useGameControllerBetHistory(
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
      refetchInterval: 7500,
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
    betHistory: (filter.type == 'player'
      ? myBetsData?.data
      : globalBets) as GameControllerGlobalBetHistoryResponse,
    isHistoryLoading: isLoading || myBetsIsLoading,
    mapHistoryTokens: mapTokens,
    historyFilter: filter,
    setHistoryFilter: setFilter,
    refetchHistory: () => {
      refetch();
      refetchMyBets();
    },
  };
};
