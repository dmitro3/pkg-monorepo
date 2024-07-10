import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { HorseRaceStatus, Multiplier } from "../constants";

type BetData = {
  name: string;
  bet: number;
};

type BetArray = BetData[];

export type MultiplierArray = {
  [key in Multiplier]: BetArray;
};

const defaultSelectedHorse: MultiplierArray = {
  "2x": [],
  "3x": [],
  "8x": [],
  "15x": [],
  "60x": [],
};

export type HorseRaceGameState = {
  status: HorseRaceStatus;
  finishTime: number;
  startTime: number;
  winnerHorse: number;
  selectedHorse: MultiplierArray;
  isParticipantsOpen: boolean;
  lastBets: Multiplier[];
};

export type HorseRaceGameActions = {
  updateState: (state: Partial<HorseRaceGameState>) => void;
  resetState: () => void;
  setSelectedHorse: (multiplier: Multiplier, data: BetData) => void;
  resetSelectedHorse: () => void;
  setIsParticipantsOpen: (isOpen: boolean) => void;
  addLastBet: (multiplier: Multiplier) => void;
};

export type HorseRaceGameStore = HorseRaceGameState & HorseRaceGameActions;

export const horseRaceGameStore = create<HorseRaceGameStore>()((set) => ({
  selectedHorse: defaultSelectedHorse,
  status: HorseRaceStatus.Idle,
  finishTime: 0,
  startTime: 0,
  winnerHorse: 0,
  lastBets: [],
  addLastBet: (item) =>
    set((state) => ({ ...state, lastBets: [...state.lastBets, item] })),
  updateState: (state) => set((s) => ({ ...s, ...state })),
  resetState: () =>
    set({
      status: HorseRaceStatus.Idle,
      finishTime: 0,
      startTime: 0,
      winnerHorse: 0,
    }),
  setSelectedHorse: (multiplier: Multiplier, data: BetData) =>
    set((state) => ({
      ...state,
      selectedHorse: {
        ...state.selectedHorse,
        [multiplier]: [...state.selectedHorse[multiplier], data],
      },
    })),
  resetSelectedHorse: () =>
    set((state) => ({ ...state, selectedHorse: defaultSelectedHorse })),
  isParticipantsOpen: false,
  setIsParticipantsOpen: (isOpen) => set({ isParticipantsOpen: isOpen }),
}));

export const useHorseRaceGameStore = <T extends keyof HorseRaceGameStore>(
  keys: T[]
) =>
  horseRaceGameStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as HorseRaceGameStore);

    return x as Pick<HorseRaceGameStore, T>;
  }, shallow);

export default useHorseRaceGameStore;
