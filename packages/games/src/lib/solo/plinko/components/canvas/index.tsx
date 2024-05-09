// size: plinkoSize
// ballCount: betCount
// multipliers: current row multiplier
// paths: number[][]
// is skipped. is animation skipped

import { useFormContext } from "react-hook-form";
import {
  PlinkoForm,
  PlinkoGameResult,
  PlinkoResultActions,
  usePlinkoGameStore,
} from "../..";
import { useMemo, useReducer } from "react";
import { DotRows } from "./dot-rows";
import { Buckets } from "./buckets";
import { rowMultipliers } from "../../constants";
import { Balls } from "./balls";

export const getMultiplierIndex = (size: number, path: number[]): number => {
  let movement = 0;
  const bucketSize = size + 1;
  const center = bucketSize / 2;

  path.forEach((v) => {
    if (v === 0) {
      movement -= 1;
    } else {
      movement += 1;
    }
  });

  const index = center + movement / 2;
  let roundedIndex = Math.round(index);

  if (roundedIndex > index) {
    roundedIndex--;
  }

  return roundedIndex;
};

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
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: PlinkoGameResult[]) => void;
  onAnimationSkipped?: (result: PlinkoGameResult[]) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  onAnimationStep = () => {},
  onAnimationCompleted = () => {},
  onAnimationSkipped = () => {},
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const form = useFormContext() as PlinkoForm;
  const { plinkoGameResults, updateGameStatus } = usePlinkoGameStore([
    "plinkoGameResults",
    "updateGameStatus",
  ]);

  const betCount = form.watch("betCount");
  const plinkoSize = form.watch("plinkoSize");
  const multipliers = rowMultipliers[plinkoSize] as number[];

  const paths = useMemo(() => {
    return plinkoGameResults.length
      ? plinkoGameResults.map((r) => r.outcomes)
      : [];
  }, [plinkoGameResults]);

  const handleAnimationEnd = (order: number, skipped = false) => {
    if (!paths) {
      return;
    }

    if (skipped) {
      dispatch({ type: PlinkoResultActions.CLEAR });
      onAnimationSkipped(plinkoGameResults);

      return;
    }

    const path = paths[order] as number[];
    const index = getMultiplierIndex(plinkoSize, path);

    dispatch({ type: PlinkoResultActions.ADD, index });

    if (!skipped) {
      onAnimationStep(order);
      console.log("test", order);
    }

    if (!skipped && order === paths.length - 1) {
      dispatch({ type: PlinkoResultActions.CLEAR });

      console.log("finish game", order);
      updateGameStatus("ENDED");
    }
  };

  return (
    <div className="wr-w-full wr-h-full wr-flex wr-justify-center wr-items-center max-md:wr-max-w-[280px] max-md:wr-my-7 max-md:wr-mx-auto">
      <div className="wr-relative wr-overflow-hidden wr-pt-[5px] max-md:wr-pt-[2px]">
        <Balls
          count={betCount}
          paths={paths}
          onAnimationEnd={handleAnimationEnd}
        />
        <DotRows size={plinkoSize} />
        <Buckets
          size={plinkoSize}
          multipliers={multipliers}
          values={state.result}
        />
      </div>
    </div>
  );
};
