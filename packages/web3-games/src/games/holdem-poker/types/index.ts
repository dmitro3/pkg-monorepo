import { Combination } from "@winrlabs/games";
import { Address } from "viem";

export enum HoldemPokerContractStatus {
  NONE,
  AWAITING_INITIAL_DEAL,
  PLAYERS_TURN,
  AWAITING_CALL_DEAL,
  RESOLVED,
}

export enum HOLDEM_POKER_EVENT_TYPES {
  Settled = "Settled",
  PlayerFolded = "PlayerFolded",
  SideBetSettled = "SideBetSettled",
  InitialGameDealt = "InitialGameDealt",
}

export interface HoldemPokerEventGameStatus {
  anteAmount: bigint;
  anteChipsAmount: number;
  betAmountSideBet: bigint;
  callBetAmount: bigint;
  gameIndex: number;
  sideBetWonAmount: bigint;
  state: bigint;
  wagerAsset: Address;
}

export interface HoldemPokerGameDealtEvent {
  cards: number[];
  combination: Combination;
  game: HoldemPokerEventGameStatus;
}

export interface HoldemPokerSideBetSettledEvent {
  cards: number[];
  combination: Combination;
  game: HoldemPokerEventGameStatus;
  payoutSideBet: bigint;
}

export interface HoldemPokerSettledEvent {
  cards: number[];
  game: HoldemPokerEventGameStatus;
  hand: {
    combination: bigint;
    cards: number[];
  };
  result: bigint;
}

export interface HoldemPokerPlayerFoldedEvent {
  game: HoldemPokerEventGameStatus;
}
