import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { VideoPokerResult } from "../_constants";

export enum VideoPokerStatus {
  Idle = "Idle",
  Active = "Active",
  Finished = "Finished",
}

export type VideoPokerGameState = {
  status: VideoPokerStatus;
  gameResult: VideoPokerResult;
};

export type VideoPokerGameActions = {
  updateState: (state: Partial<VideoPokerGameState>) => void;
  resetState: () => void;
};

export type VideoPokerGameStore = VideoPokerGameState & VideoPokerGameActions;

export const videoPokerGameStore = create<VideoPokerGameStore>((set) => ({
  status: VideoPokerStatus.Idle,
  gameResult: VideoPokerResult.LOST,
  updateState: (state) => set((s) => ({ ...s, ...state })),
  resetState: () =>
    set({
      status: VideoPokerStatus.Idle,
    }),
}));

export const useVideoPokerGameStore = <T extends keyof VideoPokerGameStore>(
  keys: T[],
) =>
  videoPokerGameStore((state) => {
    const x = keys.reduce((acc, cur) => {
      acc[cur] = state[cur];

      return acc;
    }, {} as VideoPokerGameStore);

    return x as Pick<VideoPokerGameStore, T>;
  }, shallow);

export default useVideoPokerGameStore;
