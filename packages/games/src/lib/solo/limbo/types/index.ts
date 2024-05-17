import { UseFormReturn } from "react-hook-form";

export interface LimboGameResult {
  number: number;
  payout: number;
  payoutInUsd: number;
}

export type LimboForm = UseFormReturn<
  {
    wager: number;
    stopGain: number;
    stopLoss: number;
    betCount: number;
    limboMultiplier: number;
  },
  any,
  undefined
>;
