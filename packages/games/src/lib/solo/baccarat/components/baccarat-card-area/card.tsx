import { CDN_URL } from "../../../../constants";
import { BaccaratCardValue, BaccaratSuit } from "../../types";

const BigDiamonds = <img src={`${CDN_URL}/blackjack/suits/big-diamonds.svg`} />;
const BigClubs = <img src={`${CDN_URL}/blackjack/suits/big-clubs.svg`} />;
const BigHearts = <img src={`${CDN_URL}/blackjack/suits/big-hearts.svg`} />;
const BigSpades = <img src={`${CDN_URL}/blackjack/suits/big-spades.svg`} />;

const SmallClubs = <img src={`${CDN_URL}/blackjack/suits/small-clubs.svg`} />;
const SmallDiamonds = (
  <img src={`${CDN_URL}/blackjack/suits/small-diamonds.svg`} />
);
const SmallHearts = <img src={`${CDN_URL}/blackjack/suits/small-hearts.svg`} />;
const SmallSpades = <img src={`${CDN_URL}/blackjack/suits/small-spades.svg`} />;

export class BaccaratCard {
  constructor(
    private _value: number,
    private _suit: BaccaratSuit
  ) {}

  get renderValue(): string {
    switch (this._value) {
      case BaccaratCardValue.ACE:
        return "A";

      case BaccaratCardValue.JACK:
        return "J";

      case BaccaratCardValue.QUEEN:
        return "Q";

      case BaccaratCardValue.KING:
        return "K";

      default:
        return this._value.toString();
    }
  }

  get value(): number {
    switch (this._value) {
      case BaccaratCardValue.ACE:
        return 1;

      case BaccaratCardValue.JACK:
        return 0;

      case BaccaratCardValue.QUEEN:
        return 0;

      case BaccaratCardValue.KING:
        return 0;

      default:
        return this._value;
    }
  }

  get suit(): BaccaratSuit {
    return this._suit;
  }
}

export const getBaccaratIcon = (suit: BaccaratSuit) => {
  switch (suit) {
    case BaccaratSuit.SPADES:
      return { main: BigSpades, suit: SmallSpades };

    case "hearts":
      return { main: BigHearts, suit: SmallHearts };

    case "diamonds":
      return { main: BigDiamonds, suit: SmallDiamonds };

    case "clubs":
      return { main: BigClubs, suit: SmallClubs };
  }
};

export const generateBaccaratSuits = (): BaccaratSuit[] => {
  const suits = Object.values(BaccaratSuit);

  const arr = [] as BaccaratSuit[];

  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * suits.length);

    arr.push(suits[idx] as BaccaratSuit);
  }

  return arr;
};

export const countCalculator = (f: number, s: number): number => {
  const total = f + s;

  if (total > 9) {
    const _total = total.toString();

    return Number(_total[1]);
  }

  return total;
};
