// size: plinkoSize
// ballCount: betCount
// multipliers: current row multiplier
// paths: number[][]
// is skipped. is animation skipped

import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  PlinkoForm,
  PlinkoGameResult,
  PlinkoLastBet,
  PlinkoResultActions,
  usePlinkoGameStore,
} from '../..';
import { rowMultipliers } from '../../constants';
import { getMultiplierIndex } from '../../utils';
import { Balls } from './balls';
import { Buckets } from './buckets';
import { DotRows } from './dot-rows';

const initialState = { results: [] };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case PlinkoResultActions.ADD:
      const results = [...state.results];

      if (!results[action.index]) {
        results[action.index] = 1;
      } else {
        results[action.index]++;
      }

      return { ...state, results };
    case PlinkoResultActions.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export interface CanvasProps {
  onAnimationStep?: (step: number, multiplier: number) => void;
  onAnimationCompleted?: (result: PlinkoLastBet[]) => void;
  onAnimationSkipped?: (result: PlinkoLastBet[]) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  onAnimationStep = () => {},
  onAnimationCompleted = () => {},
  onAnimationSkipped = () => {},
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const form = useFormContext() as PlinkoForm;
  const {
    plinkoGameResults,
    updateGameStatus,
    updatePlinkoGameResults,
    updateLastBets,
    addLastBet,
  } = usePlinkoGameStore([
    'plinkoGameResults',
    'updateGameStatus',
    'updatePlinkoGameResults',
    'updateLastBets',
    'addLastBet',
  ]);

  const betCount = form.watch('betCount');
  const plinkoSize = useMemo(() => {
    const _ps = form.watch('plinkoSize');
    if (_ps < 6) return 6;
    if (_ps > 12) return 12;
    else return _ps;
  }, [form]);
  const multipliers = rowMultipliers[plinkoSize] as number[];
  const [paths, setPaths] = useState<number[][]>([]);

  useEffect(() => {
    if (!plinkoGameResults.length) return;

    if (plinkoGameResults[0] && plinkoGameResults.length === 1) {
      const newOutcomes = plinkoGameResults[0].outcomes;
      setPaths((prev) => [...prev, newOutcomes]);
    } else {
      dispatch({ type: PlinkoResultActions.CLEAR });
      setPaths(plinkoGameResults.map((r) => r.outcomes));
    }

    return () => {
      dispatch({
        type: PlinkoResultActions.CLEAR,
      });
      setPaths([]);
      updatePlinkoGameResults([]);
      updateLastBets([]);
      updateGameStatus('IDLE');
    };
  }, [plinkoGameResults]);

  const handleAnimationEnd = (order: number, skipped = false) => {
    if (!paths) {
      return;
    }

    const lastBets = plinkoGameResults.map((r, i) => ({
      multiplier: multipliers[
        getMultiplierIndex(
          plinkoSize,
          skipped ? (paths[i] as number[]) : (paths[order] as number[])
        )
      ] as number,
      ...r,
    })) as PlinkoLastBet[];

    if (skipped) {
      dispatch({ type: PlinkoResultActions.CLEAR });
      setPaths([]);
      updateLastBets(lastBets);
      onAnimationSkipped(lastBets);
      updatePlinkoGameResults([]);
      updateGameStatus('ENDED');

      return;
    }

    const path = paths[order] as number[];
    const index = getMultiplierIndex(plinkoSize, path);

    dispatch({ type: PlinkoResultActions.ADD, index });

    if (!skipped) {
      const multiplier = multipliers[
        getMultiplierIndex(plinkoSize, paths[order] as number[])
      ] as number;
      onAnimationStep(order, multiplier);
      addLastBet({
        multiplier,
        ...(plinkoGameResults[order] as PlinkoGameResult),
      });
    }

    if (betCount === 1) {
      onAnimationCompleted(lastBets);
      updateGameStatus('ENDED');

      return;
    }

    if (!skipped && order === paths.length - 1 && betCount > 1) {
      onAnimationCompleted(lastBets);
      updatePlinkoGameResults([]);
      updateGameStatus('ENDED');

      // TO ENABLE THE BUCKET ANIMATION
      setTimeout(() => {
        dispatch({ type: PlinkoResultActions.CLEAR });
      }, 300);
    }
  };

  return (
    <div className="wr-w-full wr-h-full wr-flex wr-justify-center wr-items-center max-md:wr-max-w-[280px] max-md:wr-mx-auto">
      <div className="wr-relative wr-pt-[5px] max-md:wr-pt-[2px]">
        <Balls count={betCount} paths={paths} onAnimationEnd={handleAnimationEnd} />
        <DotRows size={plinkoSize} />
        <Buckets size={plinkoSize} multipliers={multipliers} values={state.results} />
      </div>
    </div>
  );
};
