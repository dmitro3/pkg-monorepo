'use client';
import * as React from 'react';

import { cn } from '../../../../lib/utils/style';
import { CDN_URL } from '../../../constants';
import useDiceGameStore from '../store';
import { DiceGameResult } from '../types';

const WIDTH = 96;
const HEIGHT = 96;

const defaultResult: DiceGameResult = {
  resultNumber: -1,
  payout: 0,
  payoutInUsd: 0,
};

export const TextRandomizer = () => {
  const { diceGameResults, currentAnimationCount } = useDiceGameStore([
    'diceGameResults',
    'currentAnimationCount',
    'gameStatus',
  ]);

  const currentResult =
    (diceGameResults.length > 0 ? diceGameResults[currentAnimationCount] : defaultResult) ||
    defaultResult;

  const [isScalable, setIsScalable] = React.useState(false);

  React.useEffect(() => {
    setIsScalable(false);

    setTimeout(() => {
      setIsScalable(true);
    }, 125);
  }, [currentResult]);

  return (
    <div className="wr-relative wr-w-[calc(100%_-_35px)] wr-mx-auto wr-border-transparent">
      <div>
        <div
          className={cn({
            'wr-opacity-0': currentResult.resultNumber == -1,
            'wr-opacity-100': diceGameResults.length === 1,
          })}
        >
          <div
            className={cn(
              'wr-absolute -wr-bottom-7 wr-z-10 wr-text-2xl wr-font-bold wr-transition-all wr-duration-100 wr-flex wr-justify-center wr-items-center',
              {
                'wr-animate-dice-scale': isScalable,
              }
            )}
            style={{
              left: `calc(${currentResult.resultNumber}% - ${WIDTH}px / 2)`,
              width: WIDTH,
              height: HEIGHT,
            }}
          >
            <img
              className="wr-absolute wr-top-1/2 wr-left-1/2 -wr-translate-x-1/2 -wr-translate-y-1/2 wr-pointer-events-none wr-select-none"
              src={`${CDN_URL}/dice/randomizer-dice.svg`}
              width={WIDTH}
              height={HEIGHT}
            />
            <span
              className={cn('wr-relative', {
                'wr-text-lime-600': currentResult?.payout > 0,
                'wr-text-red-600': currentResult?.payout <= 0,
              })}
            >
              {currentResult.resultNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// const Polygon = ({ result, resultNumber }: { result: 'win' | 'loss'; resultNumber?: number }) => {
//   return (
//     <svg
//       width="21"
//       height="15"
//       viewBox="0 0 21 15"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="wr-absolute wr-bottom-[9px] wr-z-10 -wr-translate-x-1/2  wr-transition-all wr-duration-75"
//       style={{ left: `${resultNumber}%` }}
//     >
//       <path
//         d="M12.196 13.2864C11.4127 14.5397 9.58734 14.5397 8.804 13.2864L0.500001 -1.58893e-07L20.5 -1.90735e-06L12.196 13.2864Z"
//         fill={result === 'win' ? '#65A30D' : '#DC2626'}
//       />
//     </svg>
//   );
// };
