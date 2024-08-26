import { UseFormReturn } from 'react-hook-form';

export enum RockPaperScissors {
  ROCK = '0',
  PAPER = '1',
  SCISSORS = '2',
}

export type RPSChoiceType = RockPaperScissors;

export interface RPSGameResult {
  rps: RockPaperScissors;
  payout: number;
  payoutInUsd: number;
}

export interface RpsFormFields {
  wager: number;
  betCount: number;
  stopGain: number;
  stopLoss: number;
  increaseOnWin: number;
  increaseOnLoss: number;
  rpsChoice: RockPaperScissors;
}

export type RPSForm = UseFormReturn<RpsFormFields, any, undefined>;

export interface GameAreaProps {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: RPSGameResult[]) => void;
  onAutoBetModeChange: React.Dispatch<React.SetStateAction<boolean>>;
  processStrategy: (result: RPSGameResult[]) => void;
  onSubmitGameForm: (data: RpsFormFields) => void;
  isAutoBetMode: boolean;
}
