import { UseFormReturn } from "react-hook-form";

export enum RockPaperScissors {
  ROCK = "0",
  PAPER = "1",
  SCISSORS = "2",
}

export type RPSChoiceType = RockPaperScissors;

export interface RPSGameResult {
  rps: RockPaperScissors;
  payout: number;
  payoutInUsd: number;
}

export interface RpsFormField {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  rpsChoice: RockPaperScissors;
}

export type RPSForm = UseFormReturn<RpsFormField, any, undefined>;

export interface GameAreaProps {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: RPSGameResult[]) => void;
  onAnimationSkipped?: (result: RPSGameResult[]) => void;
}
