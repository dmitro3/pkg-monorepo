export interface HoldemPokerGameProps {
  activeGameData: HoldemPokerActiveGame;
  isInitialDataFetched: boolean;
  isLoggedIn: boolean;
  minWager?: number;
  maxWager?: number;
  handleDeal: () => Promise<void>;
  handleFinalize: () => Promise<void>;
  handleFinalizeFold: () => Promise<void>;
  onFormChange: (fields: HoldemPokerFormFields) => void;
  onRefresh: () => void;
  onGameCompleted?: (move: 'fold' | 'call') => void;
}

export interface HoldemPokerFormFields {
  ante: number;
  aaBonus: number;
  wager: number;
}

export interface HoldemPokerActiveGame {
  cards: number[];
  gameIndex: number | null;
  anteChipAmount: number;
  aaBonusChipAmount: number;

  player: any;
  dealer: any;

  payoutAmount: number;
  paybackAmount: number;
  result: HoldemPokerResult;
  initialWager: number;
}

export interface HoldemPokerGamblerData {
  combination: Combination;
  cards: number[];
}

export enum Combination {
  NONE, // 0
  HIGH_CARD, // 1
  PAIR, // 2
  TWO_PAIR, // 3
  THREE_OF_A_KIND, // 4
  STRAIGHT, // 5
  FLUSH, // 6
  FULL_HOUSE, // 7
  FOUR_OF_A_KIND, // 8
  STRAIGHT_FLUSH, // 9
  ROYAL_FLUSH, // 10
  ACE_PAIR,
}

export enum HoldemPokerResult {
  NONE,
  DEALER_WINS,
  PLAYER_WINS,
  PLAYER_LOSES_FOLD,
  DEALER_NOT_QUALIFIED,
  PUSH,
}

export enum HOLDEM_POKER_GAME_STATUS {
  OnIdle = 'OnIdle', // DEAL STATE
  OnPlay = 'OnPlay', // CALL OR FOLD STATE
}
