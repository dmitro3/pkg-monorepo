import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { DiceGameResult } from "../types";

interface DiceLastBetsState {
  lastBets: DiceGameResult[];
}

interface DiceLastBetsActions {
  addLastBet: (item: DiceGameResult) => void;
  updateLastBets: (item: DiceGameResult[]) => void;
  removeLastBet: (index: number) => void;
  clearStore: () => void;
}

export type DiceLastBetsStore = DiceLastBetsState & DiceLastBetsActions;

export const diceResultStore = create<DiceLastBetsStore>()((set) => ({
  lastBets: [],
  addLastBet: (item) =>
    set((state) => ({ lastBets: [...state.lastBets, item] })),
  updateLastBets: (item) => set(() => ({ lastBets: item })),
  removeLastBet: (index) =>
    set((state) => {
      const lastBets = [...state.lastBets];

      lastBets.splice(index, 1);

      return { lastBets };
    }),
  clearStore: () => set({ lastBets: [] }),
}));

export const useDiceLastBetStore = <T extends keyof DiceLastBetsStore>(
  keys: T[]
) =>
  diceResultStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as DiceLastBetsStore);

    return x as Pick<DiceLastBetsStore, T>;
  }, shallow);

export default useDiceLastBetStore;
