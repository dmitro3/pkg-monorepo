import { create } from "zustand";
import { shallow } from "zustand/shallow";

interface PlinkoLastBets {
  multiplier: string;
  isWon: boolean;
}

interface PlinkoLastBetsState {
  lastBets: PlinkoLastBets[];
}

interface PlinkoLastBetsActions {
  addLastBet: (item: PlinkoLastBets) => void;
  updateLastBets: (item: PlinkoLastBets[]) => void;
  removeLastBet: (index: number) => void;
  clearStore: () => void;
}

export type PlinkoLastBetsStore = PlinkoLastBetsState & PlinkoLastBetsActions;

export const plinkoLastBetsStore = create<PlinkoLastBetsStore>()((set) => ({
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

export const usePlinkoLastBetsStore = <T extends keyof PlinkoLastBetsStore>(
  keys: T[]
) =>
  plinkoLastBetsStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as PlinkoLastBetsStore);

    return x as Pick<PlinkoLastBetsStore, T>;
  }, shallow);

export default usePlinkoLastBetsStore;
