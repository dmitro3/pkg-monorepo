import { useWinAnimationStore } from '../common/win-animation/store';

export const useWinAnimation = () => {
  const { updateWinAnimationState } = useWinAnimationStore();

  const showWinAnimation = ({ payout, multiplier }: { payout: number; multiplier: number }) => {
    if (multiplier <= 1) return;

    updateWinAnimationState({
      payout,
      multiplier,
      show: true,
    });
  };

  const closeWinAnimation = () =>
    updateWinAnimationState({ show: false, payout: 0, multiplier: 0 });

  return {
    showWinAnimation,
    closeWinAnimation,
  };
};
