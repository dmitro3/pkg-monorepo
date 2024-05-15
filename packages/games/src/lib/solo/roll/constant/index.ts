import { DICE } from "../types";

export const MIN_BET_COUNT = 1 as const;

export const MAX_BET_COUNT = 100 as const;

export const ALL_DICES = [
  DICE.ONE,
  DICE.TWO,
  DICE.THREE,
  DICE.FOUR,
  DICE.FIVE,
  DICE.SIX,
] as const;

export const LUCK_MULTIPLIER = 0.98;
