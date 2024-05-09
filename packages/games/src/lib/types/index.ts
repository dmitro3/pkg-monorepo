import { Address } from "viem";

export interface SoloGameResult<T> {
  won?: boolean;
  totalWager?: number;
  playedGameCount?: number;
  wager?: number;
  wagerInUsd?: number;
  profitInUsd?: number;
  payoutsInUsd?: number[];
  wagerWithMultiplier?: number;
  gameResult?: T;
}

export type GameHubEvent<T> = {
  id?: string;
  address: Address;
  type: GAME_HUB_EVENT_TYPES;
  gameType?: GAME_HUB_GAMES;
  result: T;
  currency?: GameHubCurrency;
};

export enum GAME_HUB_EVENT_TYPES {
  Dealt = "Dealt",
  Reveal = "Reveal",
  Resolve = "Resolve",
  Settled = "Settled",
  Created = "Created",
  Finalized = "Finalized",
  Finishing = "Finishing",
  HandFinalized = "HandFinalized",
  RevealAndCashout = "RevealAndCashout",

  // Wheel
  Participated = "Participated",
  ClaimedBatch = "ClaimedBatch",

  KenoResult = "KenoResult",

  // BJ
  HandSplit = "HandSplit",
  HandCreated = "HandCreated",
  HandInsured = "HandInsured",
  HandStandOff = "HandStandOff",
  PlayerHandInfo = "PlayerHandInfo",
  DealerHandInfo = "DealerHandInfo",
  HandDoubleDown = "HandDoubleDown",
  BJFinalized = "BjFinalized",
  BJSettled = "BjSettled",

  Historical = "Historical",
  Process = "Process",
  ReelSpinSettled = "ReelSpinSettled",
  GameCreated = "GameCreated",
}

export enum GAME_HUB_GAMES {
  rps = "rps",
  dice = "dice",
  keno = "keno",
  slot = "slot",
  limbo = "limbo",
  mines = "mines",
  range = "range",
  plinko = "plinko",
  roulette = "roulette",
  coin_flip = "coin_flip",
  baccarat = "baccarat",
  black_jack = "black_jack",
  video_poker = "video_poker",
  wheel = "wheel",
  moon = "moon",
  horse_race = "horse_race",
}

export type GameHubCurrency = {
  name: string;
  decimal: number;
  address: Address;
  lastPrice: number;
};
