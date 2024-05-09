import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { PlinkoGameResult } from "../types";

interface PlinkoGameState {
  lastBets: PlinkoGameResult[];
  plinkoGameResults: PlinkoGameResult[];
  gameStatus: "IDLE" | "PLAYING" | "ENDED";
  currentAnimationCount: number;
}

interface PlinkoGameStateActions {
  addLastBet: (item: PlinkoGameResult) => void;
  updateLastBets: (item: PlinkoGameResult[]) => void;
  removeLastBet: (index: number) => void;
  clearStore: () => void;
  updatePlinkoGameResults: (item: PlinkoGameResult[]) => void;
  updateGameStatus: (status: "IDLE" | "PLAYING" | "ENDED") => void;
  updateCurrentAnimationCount: (count: number) => void;
}

export type PlinkoGameStore = PlinkoGameState & PlinkoGameStateActions;

export const plinkoResultStore = create<PlinkoGameStore>()((set) => ({
  lastBets: [],
  plinkoGameResults: [],
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
  updatePlinkoGameResults: (item) => set(() => ({ plinkoGameResults: item })),
  clearStore: () =>
    set({
      lastBets: [],
      plinkoGameResults: [],
      gameStatus: "IDLE",
      currentAnimationCount: 0,
    }),
  gameStatus: "IDLE",
  updateGameStatus: (status) => set(() => ({ gameStatus: status })),
  updateCurrentAnimationCount: (count) =>
    set(() => ({ currentAnimationCount: count })),
}));

export const usePlinkoGameStore = <T extends keyof PlinkoGameStore>(
  keys: T[]
) =>
  plinkoResultStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as PlinkoGameStore);

    return x as Pick<PlinkoGameStore, T>;
  }, shallow);

export default usePlinkoGameStore;
