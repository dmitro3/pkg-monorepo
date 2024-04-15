import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { RangeGameResult } from "../_types";

interface RangeGameState {
  lastBets: RangeGameResult[];
  rangeGameResults: RangeGameResult[];
  gameStatus: "IDLE" | "PLAYING" | "ENDED";
  currentAnimationCount: number;
}

interface RangeGameStateActions {
  addLastBet: (item: RangeGameResult) => void;
  updateLastBets: (item: RangeGameResult[]) => void;
  removeLastBet: (index: number) => void;
  clearStore: () => void;
  updateRangeGameResults: (item: RangeGameResult[]) => void;
  updateGameStatus: (status: "IDLE" | "PLAYING" | "ENDED") => void;
  updateCurrentAnimationCount: (count: number) => void;
}

export type RangeGameStore = RangeGameState & RangeGameStateActions;

export const rangeResultStore = create<RangeGameStore>()((set) => ({
  lastBets: [],
  rangeGameResults: [],
  currentAnimationCount: 0,
  addLastBet: (item) =>
    set((state) => ({ lastBets: [...state.lastBets, item] })),
  updateLastBets: (item) => set(() => ({ lastBets: item })),
  removeLastBet: (index) =>
    set((state) => {
      const lastBets = [...state.lastBets];

      lastBets.splice(index, 1);

      return { lastBets };
    }),
  updateRangeGameResults: (item) => set(() => ({ rangeGameResults: item })),
  clearStore: () =>
    set({
      lastBets: [],
      rangeGameResults: [],
      gameStatus: "IDLE",
      currentAnimationCount: 0,
    }),
  gameStatus: "IDLE",
  updateGameStatus: (status) => set(() => ({ gameStatus: status })),
  updateCurrentAnimationCount: (count) =>
    set(() => ({ currentAnimationCount: count })),
}));

export const useRangeGameStore = <T extends keyof RangeGameStore>(keys: T[]) =>
  rangeResultStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as RangeGameStore);

    return x as Pick<RangeGameStore, T>;
  }, shallow);

export default useRangeGameStore;
