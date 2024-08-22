import { Account, Address, PublicClient, WalletClient } from 'viem';
import { strategyStoreAbi } from '../../abis';

export type BetConditionInput = { term: number; type: number; amount: number };
export type ProfitConditionInput = { term: number; type: number; amount: bigint };
export type ActionInput = { amount: bigint; option: number };

export type Contract = ReturnType<typeof create>;
export type List = Awaited<ReturnType<Contract['getAllStrategies']>>[0];
export type Item = Awaited<ReturnType<Contract['getItemsOfStrategy']>>[0];

export type Input = {
  store: Address;
  signer: Account;
  publicClient: PublicClient;
  walletClient: WalletClient;
};

export const create = (input: Input) => {
  const { store, signer, publicClient, walletClient } = input;
  const { address: owner } = input.signer;

  return {
    async getAllStrategies() {
      return publicClient.readContract({
        functionName: 'list',
        address: store,
        abi: strategyStoreAbi,
        args: [owner],
      });
    },
    async getItemsOfStrategy(strategyId: bigint) {
      return publicClient
        .readContract({
          functionName: 'getItems',
          address: store,
          abi: strategyStoreAbi,
          args: [strategyId],
        })
        .then((l) => {
          return l.map((i) => ({
            action: i.action,
            bet: {
              term: i.bet.term,
              type: i.bet.type_,
              amount: i.bet.amount,
            },
            profit: {
              term: i.profit.term,
              type: i.profit.type_,
              amount: i.profit.amount,
            },
            type: i.type_,
          }));
        });
    },
    async create(name: string) {
      return walletClient.writeContract({
        functionName: 'create',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [name],
      });
    },
    async removeItem(strategyId: bigint, itemId: bigint) {
      return walletClient.writeContract({
        functionName: 'remove',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [strategyId, itemId],
      });
    },
    async addBetCondition(strategyId: bigint, condition: BetConditionInput, action: ActionInput) {
      return walletClient.writeContract({
        functionName: 'addBetCondition',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [
          strategyId,
          {
            term: condition.term,
            type_: condition.type,
            amount: condition.amount,
          },
          {
            amount: action.amount,
            option: action.option,
          },
        ],
      });
    },
    async addProfitCondition(
      strategyId: bigint,
      condition: ProfitConditionInput,
      action: ActionInput
    ) {
      return walletClient.writeContract({
        functionName: 'addProfitCondition',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [
          strategyId,
          {
            term: condition.term,
            type_: condition.type,
            amount: condition.amount,
          },
          {
            amount: action.amount,
            option: action.option,
          },
        ],
      });
    },

    async updateBetCondition(
      strategyId: bigint,
      itemId: bigint,
      condition: BetConditionInput,
      action: ActionInput
    ) {
      return walletClient.writeContract({
        functionName: 'updateBetCondition',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [
          strategyId,
          itemId,
          {
            term: condition.term,
            type_: condition.type,
            amount: condition.amount,
          },
          {
            amount: action.amount,
            option: action.option,
          },
        ],
      });
    },
    async updateProfitCondition(
      strategyId: bigint,
      itemId: bigint,
      condition: ProfitConditionInput,
      action: ActionInput
    ) {
      return walletClient.writeContract({
        functionName: 'updateProfitCondition',
        address: store,
        abi: strategyStoreAbi,
        chain: walletClient.chain,
        account: signer,
        args: [
          strategyId,
          itemId,
          {
            term: condition.term,
            type_: condition.type,
            amount: condition.amount,
          },
          {
            amount: action.amount,
            option: action.option,
          },
        ],
      });
    },
  };
};
