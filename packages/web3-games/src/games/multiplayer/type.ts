export type Item<K extends string, T> = {
  type: K;
  data: T;
};

interface GameProgram {
  cooldownFinish: number;
  joinningFinish: number;
  joinningStart: number;
  result: number;
}

interface BetProgram {
  wager: bigint;
  converted: {
    wager: number;
    choice: number;
  };
  choice: number;
}

interface SessionContext {
  endblock: bigint;
  operator: string;
  player: string;
  price: bigint;
  program: string;
  startBlock: bigint;
  status: number;
  token: string;
}

interface ReceiptContext {
  payin: bigint;
  payout: bigint;
  receipent: string;
  token: string;
}

type RandomsContext = [bigint];

export interface MultiplayerGameMessage {
  context: {
    key: string;
    timestamp: number;
    type: string;
    version: number;
    context: [
      | Item<"Session", SessionContext>
      | Item<"Receipt", ReceiptContext>
      | Item<"Randoms", RandomsContext>,
    ];
    program: [Item<"Game", GameProgram> | Item<"Bet", BetProgram>];
  };
  id: string;
  program: string;
  type: string;
  timestamp: number;
}

export interface MultiplayerUpdateMessage {
  is_active: boolean;
  result: {
    joiningFinish: number;
    cooldownFinish: number;
    joiningStart: number;
    result: number;
  };
}
