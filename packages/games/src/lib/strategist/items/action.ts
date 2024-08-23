export const PRECISION = BigInt(1e8);

export enum Option {
  IncreaseByPercentage,
  DecreaseByPercentage,
  IncreaseWinChanceBy,
  DecreaseWinChanceBy,
  AddToAmount,
  SubtractFromAmount,
  AddToWinChance,
  SubtractFromWinChance,
  SetAmount,
  SetWinChance,
  SwitchOverUnder,
  ResetAmount,
  ResetWinChance,
  Stop,
}

export type Action = ReturnType<typeof toAction>;

export type Input = {
  amount: bigint;
  option: Option;
};

export const toAction = (input: Input) => {
  const applyTo = (originalWager: bigint, wager: bigint) => {
    if (!isExternalOption()) {
      if (input.option == Option.IncreaseByPercentage) {
        return wager + (wager * input.amount) / PRECISION;
      }

      if (input.option == Option.DecreaseByPercentage) {
        return wager - (wager * input.amount) / PRECISION;
      }

      if (input.option == Option.AddToAmount) {
        return wager + input.amount;
      }

      if (input.option == Option.SubtractFromAmount) {
        return wager - input.amount;
      }

      if (input.option == Option.SetAmount) {
        return input.amount;
      }

      if (input.option == Option.ResetAmount) {
        return originalWager;
      }
    }

    return wager;
  };

  const isExternalOption = () => {
    return (
      input.option == Option.IncreaseWinChanceBy ||
      input.option == Option.DecreaseWinChanceBy ||
      input.option == Option.AddToWinChance ||
      input.option == Option.SubtractFromWinChance ||
      input.option == Option.SetWinChance ||
      input.option == Option.SwitchOverUnder ||
      input.option == Option.ResetWinChance
    );
  };

  const isIncreaseWinChanceBy = () => {
    return input.option == Option.IncreaseWinChanceBy;
  };

  const isDecreaseWinChanceBy = () => {
    return input.option == Option.DecreaseWinChanceBy;
  };

  const isAddToWinChance = () => {
    return input.option == Option.AddToWinChance;
  };

  const isSubtractFromWinChance = () => {
    return input.option == Option.SubtractFromWinChance;
  };

  const isSetWinChance = () => {
    return input.option == Option.SetWinChance;
  };

  const isSwitchOverUnder = () => {
    return input.option == Option.SwitchOverUnder;
  };

  const isStop = () => {
    return input.option == Option.Stop;
  };

  return {
    applyTo,
    isExternalOption,
    isIncreaseWinChanceBy,
    isDecreaseWinChanceBy,
    isAddToWinChance,
    isSubtractFromWinChance,
    isSetWinChance,
    isSwitchOverUnder,
    isStop,
  };
};
