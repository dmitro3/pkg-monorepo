import { create } from 'zustand';

interface WinAnimationState {
  payout: number;
  multiplier: number;
  show: boolean;
}

interface WinAnimationActions {
  updateWinAnimationState: (input: Partial<WinAnimationState>) => void;
  resetWinAnimationState: () => void;
}

type WinAnimationStore = WinAnimationState & WinAnimationActions;

const useWinAnimationStore = create<WinAnimationStore>()((set) => ({
  payout: 0,
  show: false,
  multiplier: 0,
  resetWinAnimationState: () =>
    set((state) => {
      return {
        ...state,
        payout: 0,
        multiplier: 0,
        show: false,
      };
    }),
  updateWinAnimationState: (input) =>
    set((state) => {
      return {
        ...state,
        ...input,
      };
    }),
}));

export { useWinAnimationStore };
