export enum SingleBlackjackHandIndex {
  FIRST,
  SPLITTED_FIRST,
  DEALER,
}

export type SingleBJHand = {
  chipsAmount: number;
  isInsured: boolean;
  status: SingleBlackjackHandStatus;
  isDouble: boolean;
  isSplitted: boolean;
  splittedHandIndex: null | number;
};

export type SingleBJGameStruct = {
  activeHandIndex: number;
  canInsure: boolean;
  status: SingleBlackjackGameStatus;
};

export type SingleBJCards = {
  amountCards: number;
  cards: number[];
  totalCount: number;
  isSoftHand: boolean;
  canSplit: boolean;
};

export type SingleBJActiveGameHands = Record<
  "dealer" | "firstHand" | "splittedFirstHand",
  {
    cards: SingleBJCards | null;
    hand: SingleBJHand | null;
    gameResult?: boolean;
    handId?: number;
    settledResult?: any;
  }
>;

export enum SingleBlackjackGameResult {
  DEALER_BLACKJACK_HAND_PUSH = 0,
  DEALER_BLACKJACK_PLAYER_LOST,
  DEALER_BLACKJACK_PLAYER_INSURED,
  DEALER_BUST_PLAYER_LOST,
  DEALER_BUST_PLAYER_WIN,
  DEALER_BUST_PLAYER_BLACKJACK,
  DEALER_STAND_HAND_PUSH,
  DEALER_STAND_PLAYER_WIN,
  DEALER_STAND_PLAYER_LOST,
}

export enum SingleBlackjackGameStatus {
  NONE, // 0
  TABLE_DEAL, // 1
  PLAYER_TURN, // 2
  DEALER_TURN, // 3
  FINISHED, // 4
}

export enum SingleBlackjackHandStatus {
  NONE,
  PLAYING, // 1
  AWAITING_HIT, // 2
  STAND, // 3
  BUST, // 4
  BLACKJACK, // 5
}

export interface SingleBJDealFormFields {
  wager: number;
}

export interface SingleBlackjackGameProps {
  activeGameData: SingleBJGameStruct;
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
}
