"use client";

import { createContext, useContext } from "react";

interface Currency {
  icon: string;
  name: string;
  symbol: string;
}

interface Account {
  balance: number;
}

interface Defaults {
  minWager: number;
  maxWager: number;
  maxBet: number;
}

interface GameContextProps {
  options: {
    /**
     * Selected currency for the games
     */
    currency: Currency;
    /**
     * Account details
     */
    account?: Account;
    /**
     * Default values for the games
     */
    defaults?: Defaults;
  };
}

interface GameProviderProps extends GameContextProps {
  children: React.ReactNode;
}

const GameContext = createContext<GameContextProps>({
  options: {
    currency: {
      icon: "",
      name: "",
      symbol: "",
    },
  },
});

export const GameProvider = ({ children, options }: GameProviderProps) => {
  return (
    <GameContext.Provider value={{ options }}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};

export const useGameOptions = () => {
  return useGame().options;
};
