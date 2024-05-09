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

export interface DiceGameResult {
  dice: number;
  payout: number;
  payoutInUsd: number;
}

export type DiceResult = SoloGameResult<DiceGameResult[]>;

export type DiceEventResult = GameHubEvent<SoloGameResult<DiceGameResult[]>>;

export interface GameAreaProps {
  winner?: number;
  loading: boolean;
}
