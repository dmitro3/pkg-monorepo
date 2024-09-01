import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useMinesGameStateStore } from '../store';
import {
  MINES_GAME_STATUS,
  MINES_SUBMIT_TYPE,
  MinesForm,
  MinesFormField,
  MinesGameResult,
  MinesGameResultOnComplete,
} from '../types';

export type MinesGameProps = React.ComponentProps<'div'> & {
  gameResults: MinesGameResult[];
  isLoading?: boolean;
  isAutoBetMode: boolean;
  onAnimationCompleted?: (result: MinesGameResultOnComplete) => void;
  processStrategy: (result: MinesGameResult[]) => void;
  onAutoBetModeChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitGameForm: (data: MinesFormField) => void;
};

export const MinesGame = ({
  gameResults,
  children,
  processStrategy,
  isAutoBetMode,
  onAutoBetModeChange,
  onSubmitGameForm,
}: MinesGameProps) => {
  const { updateMinesGameResults, updateGameStatus, minesGameResults, updateMinesGameState } =
    useMinesGameStateStore([
      'updateMinesGameResults',
      'updateGameStatus',
      'minesGameResults',
      'updateMinesGameState',
    ]);

  const form = useFormContext() as MinesForm;
  const betCount = form.watch('betCount');
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const isAutoBetModeRef = React.useRef<boolean>();

  React.useEffect(() => {
    if (gameResults.length) {
      updateMinesGameResults(gameResults);
      updateGameStatus(MINES_GAME_STATUS.IN_PROGRESS);
    }
  }, [gameResults]);

  React.useEffect(() => {
    if (!gameResults.length) return;

    processStrategy(gameResults);
    isAutoBetModeRef.current = isAutoBetMode;
    onAutoBetModeChange(isAutoBetMode);
    timeoutRef.current = setTimeout(() => {
      if (isAutoBetModeRef.current) {
        const newBetCount = betCount - 1;

        betCount !== 0 && form.setValue('betCount', betCount - 1);

        updateMinesGameState({
          submitType: MINES_SUBMIT_TYPE.CASHOUT,
        });

        console.log('mines.bet', betCount);

        if (betCount >= 0 && newBetCount != 0) {
          onSubmitGameForm(form.getValues());
        } else {
          onAutoBetModeChange(false);
        }
      }
    }, 250);
  }, [gameResults]);

  React.useEffect(() => {
    isAutoBetModeRef.current = isAutoBetMode;
    if (!isAutoBetMode) clearTimeout(timeoutRef.current);
  }, [isAutoBetMode]);

  return <>{children}</>;
};
