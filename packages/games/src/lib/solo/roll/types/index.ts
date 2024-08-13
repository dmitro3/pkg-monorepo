import { UseFormReturn } from 'react-hook-form';

export enum DICE {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
}

export type DiceType = DICE;

export interface RollGameResult {
  dice: number;
  payout: number;
  payoutInUsd: number;
}

export interface RollFormFields {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  dices: DICE[];
}

export type RollForm = UseFormReturn<RollFormFields, any, undefined>;
