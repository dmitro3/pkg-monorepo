import * as Storage from './storage';
import * as StatisticStore from './statistic-store';
import * as Strategist from './strategist';

export type Manager = ReturnType<typeof create>;

export type Input = {
  contract: StatisticStore.Input;
};

const convertItems = (items: StatisticStore.Item[]) => {
  return items.map((i) => ({
    condition:
      i.type == 1
        ? Strategist.Items.Bet.toCondition({
            term: i.bet.term,
            type: i.bet.type,
            amount: i.bet.amount,
          })
        : i.type == 2
        ? Strategist.Items.Profit.toCondition({
            term: i.profit.term,
            type: i.profit.type,
            amount: i.profit.amount,
          })
        : undefined,
    action: Strategist.Items.Action.toAction(i.action),
  })) as Strategist.Item[];
};

export const create = (input: Input) => {
  const statisticStore = StatisticStore.create(input.contract);
  const storage = Storage.create();

  return {
    getList: async (force = false) => {
      if (force || storage.get().length == 0) {
        const strategies = await statisticStore.getAllStrategies();
        storage.set(strategies as StatisticStore.List[]);
      }

      return storage.get();
    },
    getItems: async (id: number, force = false) => {
      if (force || storage.getItems(id).length == 0) {
        const items = await statisticStore.getItemsOfStrategy(BigInt(id));
        storage.setItems(id, items as StatisticStore.Item[]);
      }

      return storage.getItems(id);
    },
    create: async (name: string) => {
      await statisticStore.create(name);
      storage.create(name);
    },
    use: async (strategyId: number, wager: bigint, balance: bigint) => {
      const items = storage.getItems(strategyId);

      return Strategist.load({ items: convertItems(items), wager, balance });
    },
    add: async (
      strategyId: bigint,
      input: StatisticStore.BetConditionInput | StatisticStore.ProfitConditionInput,
      action: StatisticStore.ActionInput,
    ) => {
      if (typeof input.amount === 'number') {
        await statisticStore.addBetCondition(strategyId, input as StatisticStore.BetConditionInput, action);
      } else {
        await statisticStore.addProfitCondition(strategyId, input as StatisticStore.ProfitConditionInput, action);
      }

      storage.addItem(Number(strategyId), input, action);
    },
    update: async (
      strategyId: bigint,
      itemId: bigint,
      input: StatisticStore.BetConditionInput | StatisticStore.ProfitConditionInput,
      action: StatisticStore.ActionInput,
    ) => {
      if (typeof input.amount === 'number') {
        await statisticStore.updateBetCondition(strategyId, itemId, input as StatisticStore.BetConditionInput, action);
      } else {
        await statisticStore.updateProfitCondition(
          strategyId,
          itemId,
          input as StatisticStore.ProfitConditionInput,
          action,
        );
      }

      storage.updateItem(Number(strategyId), Number(itemId), input, action);
    },
    remove: async (strategyId: bigint, itemId: bigint) => {
      await statisticStore.removeItem(strategyId, itemId);

      storage.removeItem(Number(strategyId), Number(itemId));
    },
  };
};
