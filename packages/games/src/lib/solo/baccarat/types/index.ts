import { UseFormReturn } from 'react-hook-form';

export interface BaccaratFormFields {
  wager: number;
  playerWager: number;
  bankerWager: number;
  tieWager: number;
  betCount: number;
  increaseOnWin: number;
  increaseOnLoss: number;
  stopGain: number;
  stopLoss: number;
}

export type BaccaratForm = UseFormReturn<BaccaratFormFields, any, undefined>;

export enum BaccaratBetType {
  TIE,
  BANKER,
  PLAYER,
}

export enum BaccaratCardValue {
  ACE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
}

export enum BaccaratSuit {
  HEARTS = 'hearts',
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs',
  SPADES = 'spades',
}

export interface BaccaratGameSettledResult {
  won: boolean;
  wager: number;
  payout: number;
}

export interface BaccaratGameResult {
  playerHand: BaccaratGameHand;
  bankerHand: BaccaratGameHand;
}

export interface BaccaratGameHand {
  hasThirdCard: boolean;
  firstCard: number;
  secondCard: number;
  thirdCard: number;
}

export interface BaccaratGameProps {
  baccaratResults: BaccaratGameResult | null;
  baccaratSettledResults: BaccaratGameSettledResult | null;

  onAnimationCompleted?: (r: BaccaratGameSettledResult) => void;
}
