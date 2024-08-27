import React from 'react';

import useKenoGameStore from '../store';
import { KenoGameResult } from '../types';

export type KenoGameProps = React.ComponentProps<'div'> & {
  gameResults: KenoGameResult[];
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: KenoGameResult[]) => void;
  onAnimationSkipped?: (result: KenoGameResult[]) => void;
  onError?: (e: any) => void;
};

export const KenoGame = ({ gameResults, children }: KenoGameProps) => {
  const { updateKenoGameResults } = useKenoGameStore(['updateKenoGameResults']);

  React.useEffect(() => {
    if (gameResults.length) {
      updateKenoGameResults(gameResults);
    }
  }, [gameResults]);

  return <>{children}</>;
};
