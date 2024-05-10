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

export interface GameAreaProps {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: () => void;
  onAnimationSkipped?: () => void;
}
