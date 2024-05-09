import { GameHubEvent, SoloGameResult } from "../../../types";

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

export type RollResult = SoloGameResult<RollGameResult[]>;

export type DiceEventResult = GameHubEvent<SoloGameResult<RollGameResult[]>>;

export interface GameAreaProps {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: () => void;
  onAnimationSkipped?: () => void;
}
