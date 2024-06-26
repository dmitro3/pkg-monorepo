import { create } from "zustand";
import { createSelectors } from "../../utils/store";

interface WheelGameState {
  finishTime: number;
  lastBets: number[];
  status: "IDLE" | "SPIN" | "STARTED" | "FINISHED";
  isParticipantsOpen: boolean;
}

export type Multiplier = "2x" | "3x" | "6x" | "48x";

interface WheelGameStateActions {
  setIsParticipantsOpen: (isParticipantsOpen: boolean) => void;
}

export type WheelGameStore = WheelGameState & WheelGameStateActions;

export const wheelGameStore = create<WheelGameStore>()((set) => ({
  finishTime: 0,
  lastBets: [],
  status: "IDLE",
  isParticipantsOpen: false,
  setIsParticipantsOpen: (isParticipantsOpen: boolean) =>
    set(() => ({ isParticipantsOpen })),
}));

export const useWheelGameStore = createSelectors<WheelGameStore>(
  wheelGameStore,
);
