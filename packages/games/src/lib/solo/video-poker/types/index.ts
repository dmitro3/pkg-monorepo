import { UseFormReturn } from "react-hook-form";

export enum CardStatus {
  CLOSED = 0,
  OPEN = 1,
}

export interface VideoPokerFormFields {
  wager: number;
  cardsToSend: CardStatus[];
}

export type VideoPokerForm = UseFormReturn<
  VideoPokerFormFields,
  any,
  undefined
>;

export enum Value {
  two = 0,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  jack,
  queen,
  king,
  ace,
}

export enum Suit {
  hearts = "hearts",
  diamonds = "diamonds",
  clubs = "clubs",
  spades = "spades",
}

export class Card {
  constructor(
    private _value: number,
    private _suit: string
  ) {}

  get value(): string {
    switch (this._value) {
      case Value.jack:
        return "J";

      case Value.queen:
        return "Q";

      case Value.king:
        return "K";

      case Value.ace:
        return "A";

      default:
        return (2 + this._value).toString();
    }
  }

  get className(): string {
    switch (this._suit) {
      case Suit.hearts:
        return "hearts";

      case Suit.diamonds:
        return "diamonds";

      case Suit.clubs:
        return "clubs";

      case Suit.spades:
        return "spades";

      default:
        return "";
    }
  }
}
