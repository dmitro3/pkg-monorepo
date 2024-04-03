import { createContext } from "react";

interface GameContextProps {}

const GameContext = createContext<GameContextProps>({});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
