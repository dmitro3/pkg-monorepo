export enum Term {
  Every,
  EveryStreakOf,
  FirstStreakOf,
  StreakGreaterThan,
  StreakLowerThan,
}

export enum Type {
  Win,
  Lose,
  Bet,
}

export type BetCondition = ReturnType<typeof toCondition>;

export type Input = {
  term: Term;
  type: Type;
  amount: number;
};

export const toCondition = (input: Input) => {
  const every = (bet: number, win: number, lose: number) => {
    if (input.type == Type.Win) {
      return win >= input.amount && win % input.amount == 0;
    }

    if (input.type == Type.Lose) {
      return lose >= input.amount && lose % input.amount == 0;
    }

    if (input.type == Type.Bet) {
      return bet >= input.amount && bet % input.amount == 0;
    }

    return false;
  };

  const everyStreakOf = (win: number, lose: number) => {
    if (input.type == Type.Win) {
      return win >= input.amount && win % input.amount == 0;
    }

    if (input.type == Type.Lose) {
      return lose >= input.amount && lose % input.amount == 0;
    }

    if (input.type == Type.Bet) {
      return (win >= input.amount && win % input.amount == 0) || (lose >= input.amount && lose % input.amount == 0);
    }

    return false;
  };

  const firstStreakOf = (win: number, lose: number) => {
    if (input.type == Type.Win) {
      return win == input.amount;
    }

    if (input.type == Type.Lose) {
      return lose == input.amount;
    }

    if (input.type == Type.Bet) {
      return win == input.amount || lose == input.amount;
    }

    return false;
  };

  const streakGreaterThan = (win: number, lose: number) => {
    if (input.type == Type.Win) {
      return win > input.amount;
    }

    if (input.type == Type.Lose) {
      return lose > input.amount;
    }

    if (input.type == Type.Bet) {
      return win > input.amount || lose > input.amount;
    }

    return false;
  };

  const streakLowerThan = (win: number, lose: number) => {
    if (input.type == Type.Win) {
      return win > 1 && win < input.amount;
    }

    if (input.type == Type.Lose) {
      return lose > 1 && lose < input.amount;
    }

    if (input.type == Type.Bet) {
      return (win > 1 && win < input.amount) || (lose > 1 && lose < input.amount);
    }

    return false;
  };

  const satisfy = (bet: number, win: number, lose: number) => {
    if (input.term == Term.Every) {
      return every(bet, win, lose);
    }

    if (input.term == Term.EveryStreakOf) {
      return everyStreakOf(win, lose);
    }

    if (input.term == Term.FirstStreakOf) {
      return firstStreakOf(win, lose);
    }

    if (input.term == Term.StreakGreaterThan) {
      return streakGreaterThan(win, lose);
    }

    if (input.term == Term.StreakLowerThan) {
      return streakLowerThan(win, lose);
    }

    return false;
  };

  return {
    t: 'bet' as const,
    satisfy,
  };
};
