import { UseFormReturn } from "react-hook-form";

export interface DiceFormFields {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  rollValue: number;
  winChance: number;
  rollType: "OVER" | "UNDER";
}
export type DiceForm = UseFormReturn<DiceFormFields, any, undefined>;

export interface DiceGameResult {
  resultNumber: number;
  payout: number;
  payoutInUsd: number;
}
