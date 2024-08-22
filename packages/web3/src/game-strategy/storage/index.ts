// @ts-nocheck
import * as StatisticStore from '../statistic-store';

export type Storage = ReturnType<typeof create>;
export type Strategy = { name: string; itemIds: number[] };

export type Cache = {
  list: Strategy[];
  items: { [index: number]: StatisticStore.Item[] };
};

export const create = () => {
  const cache: Cache = { list: [], items: {} };

  return {
    get: () => cache.list,
    set: (list: StatisticStore.List[]) =>
      (cache.list = list.map((l) => ({ name: l.name, itemIds: l.itemIds as number[] }))),
    create: (name: string) => {
      cache.list.push({ name, itemIds: [] });
      return cache.list.length - 1;
    },
    getItems: (index: number) => cache.items[index] || [],
    setItems: (index: number, items: StatisticStore.Item[]) => (cache.items[index] = items),
    addItem: (
      index: number,
      condition: StatisticStore.BetConditionInput | StatisticStore.ProfitConditionInput,
      action: StatisticStore.ActionInput
    ) => {
      if (!cache.items[index]) {
        throw new Error('Strategy could not find!');
      }

      const isBigInt = typeof condition.amount == 'bigint';

      cache.items[index].push({
        type: isBigInt ? 2 : 1,
        bet: !isBigInt
          ? (condition as StatisticStore.BetConditionInput)
          : {
              term: 0,
              type: 0,
              amount: 0,
            },
        profit: isBigInt
          ? (condition as StatisticStore.ProfitConditionInput)
          : {
              term: 0,
              type: 0,
              amount: 0n,
            },
        action,
      });

      return cache.items[index];
    },
    updateItem: (
      index: number,
      itemIndex: number,
      condition: StatisticStore.BetConditionInput | StatisticStore.ProfitConditionInput,
      action: StatisticStore.ActionInput
    ) => {
      if (!cache.items[index]) {
        throw new Error('Strategy could not find!');
      }

      const isBigInt = typeof condition.amount == 'bigint';

      cache.items[index][itemIndex] = {
        type: isBigInt ? 2 : 1,
        bet: !isBigInt
          ? (condition as StatisticStore.BetConditionInput)
          : {
              term: 0,
              type: 0,
              amount: 0,
            },
        profit: isBigInt
          ? (condition as StatisticStore.ProfitConditionInput)
          : {
              term: 0,
              type: 0,
              amount: 0n,
            },
        action,
      };

      return cache.items[index];
    },
    removeItem: (index: number, itemIndex: number) => {
      cache.items[index].splice(itemIndex, 1);

      return cache.items[index];
    },
  };
};
