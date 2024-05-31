import { UseFormReturn } from "react-hook-form";

export const MIN_BET_COUNT = 1 as const;

export const MAX_BET_COUNT = 100 as const;

export enum COIN_SIDE {
  ETH = "0",
  BTC = "1",
}

export type CoinFlipForm = UseFormReturn<
  {
    wager: number;
    betCount: number;
    stopGain: number;
    stopLoss: number;
    coinSide: COIN_SIDE;
  },
  any,
  undefined
>;
