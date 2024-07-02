import { create } from "zustand";
import { createSelectors } from "../../utils/store";
import { MultiplayerGameStatus } from "../core/type";
import { Multiplier, WheelColor } from "./constants";

type BetData = {
  name: string;
  bet: number;
};

type BetArray = BetData[];

export type MultiplierArray = {
  [key in Multiplier]: BetArray;
};

interface WheelGameState {
  joiningStart: number;
  joiningFinish: number;
  cooldownFinish: number;
  status: MultiplayerGameStatus;
  lastBets: number[];
  isParticipantsOpen: boolean;
  wheelParticipants: MultiplierArray;
  winnerAngle: number;
  winnerColor: WheelColor;
  allParticipantCount: () => number;
}

interface WheelGameStateActions {
  setIsParticipantsOpen: (isParticipantsOpen: boolean) => void;
  setWheelParticipant: (multiplier: Multiplier, data: BetData) => void;
  resetWheelParticipant: () => void;
  updateTime: (joiningStart: number, joiningFinish: number) => void;
  updateState: (state: Partial<WheelGameState>) => void;
  resetState: () => void;
}

const defaultWheelParticipant: MultiplierArray = {
  "2x": [],
  "3x": [],
  "6x": [],
  "48x": [],
};

export type WheelGameStore = WheelGameState & WheelGameStateActions;

export const wheelGameStore = create<WheelGameStore>()((set, get) => ({
  lastBets: [],
  joiningStart: 0,
  joiningFinish: 0,
  cooldownFinish: 0,
  winnerColor: WheelColor.IDLE,
  winnerAngle: 0,
  status: MultiplayerGameStatus.None,

  isParticipantsOpen: false,
  setIsParticipantsOpen: (isParticipantsOpen: boolean) =>
    set(() => ({ isParticipantsOpen })),
  wheelParticipants: defaultWheelParticipant,
  setWheelParticipant: (multiplier: Multiplier, data: BetData) =>
    set((state) => ({
      ...state,
      wheelParticipants: {
        ...state.wheelParticipants,
        [multiplier]: [...state.wheelParticipants[multiplier], data],
      },
    })),
  resetWheelParticipant: () =>
    set((state) => ({ ...state, wheelParticipants: defaultWheelParticipant })),
  allParticipantCount: () =>
    Object.values(get().wheelParticipants).reduce(
      (acc, cur) => acc + cur.length,
      0,
    ),
  updateState: (newState: Partial<WheelGameState>) =>
    set((state) => ({ ...state, ...newState })),
  updateTime: (joiningStart: number, joiningFinish: number) =>
    set((state) => ({ ...state, joiningStart, joiningFinish })),
  resetState: () =>
    set(() => ({
      joiningStart: 0,
      joiningFinish: 0,
      cooldownFinish: 0,
      status: MultiplayerGameStatus.None,
      winnerColor: WheelColor.IDLE,
    })),
}));

export const useWheelGameStore = createSelectors<WheelGameStore>(
  wheelGameStore,
);

export const useWheelGameStatus = () => {
  const {
    cooldownFinish,
    joiningFinish,
    joiningStart,
  } = useWheelGameStore(["cooldownFinish", "joiningFinish", "joiningStart"]);

  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > cooldownFinish && currentTime < joiningStart) {
    return MultiplayerGameStatus.Finish;
  } else if (
    joiningFinish > 0 &&
    currentTime < joiningFinish &&
    currentTime > joiningStart
  ) {
    return MultiplayerGameStatus.Cooldown;
  } else if (
    joiningStart > 0 &&
    currentTime > joiningStart &&
    currentTime > joiningFinish
  ) {
    return MultiplayerGameStatus.Start;
  }

  return MultiplayerGameStatus.None;
};
