// @ts-nocheck
import { Action } from './items/action';
import { BetCondition } from './items/bet';
import { ProfitCondition } from './items/profit';

export * as Items from './items';

export type Strategist = ReturnType<typeof load>;

export type Item = {
  condition: BetCondition | ProfitCondition;
  action: Action;
};

export type Input = {
  items: Item[];
  wager: bigint;
  balance: bigint;
};

export const load = (input: Input) => {
  let bet = 0;
  let win = 0;
  let lose = 0;
  const getNextWagerOrAction = (wager: bigint, profit: bigint, loss: bigint) => {
    for (let i = 0; i < input.items.length; i++) {
      const item = input.items[i];

      if (item.condition.t == 'bet' && item.condition.satisfy(bet, win, lose)) {
        return { wager: item.action.applyTo(input.wager, wager), action: item.action };
      } else if (
        item.condition.t == 'profit' &&
        item.condition.satisfy(input.balance, profit, loss)
      ) {
        return { wager: item.action.applyTo(input.wager, wager), action: item.action };
      }
    }

    return { wager, action: undefined };
  };

  const process = (wager: bigint, payout: bigint) => {
    let profit = 0n;
    let loss = 0n;

    if (payout >= wager) {
      bet += 1;
      win += 1;
      lose = 0;

      profit = payout - wager;
    } else {
      bet += 1;
      lose += 1;
      win = 0;

      loss = wager - payout;
    }

    return getNextWagerOrAction(wager, profit, loss);
  };

  return {
    process,
  };
};
