import { UseFormReturn } from 'react-hook-form';

export interface LimboGameResult {
  number: number;
  payout: number;
  payoutInUsd: number;
}

export interface LimboFormField {
  wager: number;
  stopGain: number;
  stopLoss: number;
  increaseOnWin: number;
  increaseOnLoss: number;
  betCount: number;
  limboMultiplier: number;
}

export type LimboForm = UseFormReturn<LimboFormField, any, undefined>;
