import { Cards, GameStruct, Hand } from '../../blackjack';

export enum SingleBlackjackHandIndex {
  FIRST,
  SPLITTED_FIRST,
  DEALER,
}

export type SingleBJActiveGameHands = Record<
  'dealer' | 'firstHand' | 'splittedFirstHand',
  {
    cards: Cards | null;
    hand: Hand | null;
    gameResult?: boolean;
    handId?: number;
    settledResult?: any;
  }
>;

export interface SingleBJDealFormFields {
  wager: number;
}

export interface SingleBlackjackGameProps {
  activeGameData: GameStruct;
  activeGameHands: SingleBJActiveGameHands;
  isControllerDisabled?: boolean;
  initialDataFetched: boolean;

  onGameCompleted: () => void;
  onDeal: (values: SingleBJDealFormFields) => void;
  onReset: () => void;
  onHit: (handIndex: number) => void;
  onSplit: (handIndex: number) => void;
  onDoubleDown: (handIndex: number) => void;
  onInsure: (handIndex: number) => void;
  onStand: (handIndex: number) => void;
  onFormChange?: (f: SingleBJDealFormFields) => void;
}
