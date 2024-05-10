import { UseFormReturn } from "react-hook-form";

export interface RangeFormField {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  rollValue: number;
  winChance: number;
  rollType: "OVER" | "UNDER";
}
export type RangeForm = UseFormReturn<RangeFormField, any, undefined>;

export interface RangeGameResult {
  resultNumber: number;
  payout: number;
  payoutInUsd: number;
}
