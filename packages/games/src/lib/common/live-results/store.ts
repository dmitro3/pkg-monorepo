import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { GameType } from "../../constants";
import { toDecimals } from "../../utils/web3";

export interface GameNotifications {
  payoutInUsd: number;
  won: boolean;
  order: number;
  wagerInUsd: number;
  duration: number;
  component?: React.ReactNode;
}

export interface GameResultSummary {
  currentProfit: number;
  currentOrder: number;
  wonCount: number;
  lossCount: number;
  currency?: any;
  playedGameCount?: number;
  wagerWithMultiplier?: number;
  game?: GameType;
}

interface GameNotificationsState {
  isFinished: boolean;
  isSkipped: boolean;
  resultSummary: GameResultSummary;
  playedNotifications: GameNotifications[];
}

interface GameNotificationsActions {
  updatePlayedNotifications: (item: GameNotifications) => void;
  updateResultSummary: (item: Partial<GameResultSummary>) => void;
  updateIsFinished: (item: boolean) => void;
  skipNotifications: (item: Partial<GameNotificationsState>) => void;
  clearPlayedNotifications: () => void;
  updateIsSkipped: (item: boolean) => void;
  clearResultSummary: () => void;
}

export type GameNotificationsStore = GameNotificationsState &
  GameNotificationsActions;

export const gameNotificationStore = create<GameNotificationsStore>()(
  (set, get) => ({
    isFinished: true,
    isSkipped: false,
    resultSummary: {
      currentProfit: 0,
      currentOrder: 0,
      wonCount: 0,
      lossCount: 0,
    },
    playedNotifications: [],
    updateResultSummary: (item) =>
      set((state) => {
        return {
          ...state,
          resultSummary: {
            ...state.resultSummary,
            ...item,
          },
        };
      }),
    clearPlayedNotifications: () =>
      set((state) => {
        return {
          ...state,
          playedNotifications: [],
        };
      }),
    clearResultSummary: () =>
      set((state) => {
        return {
          ...state,
          resultSummary: {
            currency: undefined,
            wagerWithMultiplier: undefined,
            playedGameCount: 0,
            currentProfit: 0,
            currentOrder: 0,
            wonCount: 0,
            lossCount: 0,
          },
        };
      }),
    skipNotifications: (item) =>
      set((state) => {
        return {
          ...state,
          ...item,
        };
      }),
    updatePlayedNotifications: (item) =>
      set((state) => {
        const currentProfit = get()?.resultSummary.currentProfit;
        const game = get()?.resultSummary.game;

        const newProfit = item.won
          ? currentProfit + item.payoutInUsd
          : currentProfit - item.wagerInUsd;

        const newPlinkoProfit = item.won
          ? currentProfit + item.payoutInUsd - item.wagerInUsd
          : currentProfit - item.wagerInUsd + item.payoutInUsd;

        return {
          ...state,
          isFinished: false,
          resultSummary: {
            ...get()?.resultSummary,
            wonCount: item.won
              ? get()?.resultSummary.wonCount + 1
              : get()?.resultSummary.wonCount,
            lossCount: !item.won
              ? get()?.resultSummary.lossCount + 1
              : get()?.resultSummary.lossCount,
            currentProfit:
              game === GameType.PLINKO
                ? toDecimals(newPlinkoProfit, 2)
                : toDecimals(newProfit, 2),

            currentOrder: get()?.resultSummary.currentOrder + 1,
          },

          playedNotifications: [...state.playedNotifications, item],
        };
      }),

    updateIsFinished: (item) =>
      set((state) => {
        return {
          ...state,
          isFinished: item,
        };
      }),
    updateIsSkipped: (item) =>
      set((state) => {
        return {
          ...state,
          isSkipped: item,
        };
      }),
  })
);

export const useGameNotifications = <T extends keyof GameNotificationsStore>(
  keys: T[]
) =>
  gameNotificationStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as GameNotificationsStore);

    return x as Pick<GameNotificationsStore, T>;
  }, shallow);

export default useGameNotifications;
