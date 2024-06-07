import { UseFormReturn } from "react-hook-form";

export interface Plinko3dFormFields {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  plinkoSize: number;
}

export type Plinko3dForm = UseFormReturn<Plinko3dFormFields, any, undefined>;

export interface PlinkoGameResult {
  outcomes: number[];
  payout: number;
  payoutInUsd: number;
}
