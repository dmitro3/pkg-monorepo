import { UseFormReturn } from "react-hook-form";

export interface PlinkoFormField {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  plinkoSize: number;
}

export type PlinkoForm = UseFormReturn<PlinkoFormField, any, undefined>;

export interface PlinkoGameResult {
  outcomes: number[];
  payout: number;
  payoutInUsd: number;
}

export enum PlinkoResultActions {
  ADD,
  CLEAR,
}
