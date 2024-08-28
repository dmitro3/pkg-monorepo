import React from 'react';

import { cn } from '../../../../lib/utils/style';
import { LastBetsContainer } from '../../../common/last-bets-container';
import useMediaQuery from '../../../hooks/use-media-query';
import { useDiceGameStore } from '..';

export const RangeLastBets: React.FC = () => {
  const { lastBets } = useDiceGameStore(['lastBets']);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const maxItems = isMobile ? 5 : 9;
  const [displayBets, setDisplayBets] = React.useState<any[]>([]);

  React.useEffect(() => {
    const newBet = lastBets?.[lastBets.length - 1];

    if (newBet) {
      setDisplayBets((prev) => {
        const updatedBets = [
          ...prev.map((bet) => ({ ...bet, animation: '' })),
          { ...newBet, animation: 'fade-in' },
        ];
        if (updatedBets.length > maxItems) {
          updatedBets.shift();
        }

        return updatedBets;
      });
    }
  }, [lastBets, maxItems]);

  return (
    <LastBetsContainer>
      {displayBets?.map((result, index) => {
        return (
          <div
            key={`${index}-${result.resultNumber}`}
            className={cn(
              'wr-flex wr-h-7 wr-w-[53px] wr-flex-shrink-0 wr-transition-all wr-duration-500 wr-items-center wr-justify-center wr-rounded-[1000px] wr-bg-zinc-700 wr-font-semibold wr-text-zinc-100',
              {
                'wr-bg-green-500': result.payout > 0,
                'wr-animate-fade-in': result.animation === 'fade-in',
                'wr-animate-fade-out':
                  (isMobile ? displayBets.length == 5 : displayBets.length == 9) && index == 0,
              }
            )}
          >
            <div className="wr-text-zinc-100">{result.resultNumber}</div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};
