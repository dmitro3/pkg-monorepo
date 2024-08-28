import React from 'react';

import { LastBetsContainer } from '../../../common/last-bets-container';
import { CDN_URL } from '../../../constants';
import useMediaQuery from '../../../hooks/use-media-query';
import { cn } from '../../../utils/style';
import { CoinSide, useCoinFlipGameStore } from '..';

export const CoinFlipLastBets: React.FC = () => {
  const { lastBets } = useCoinFlipGameStore(['lastBets']);
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
            key={`${index}-${result.coinSide}`}
            className={cn(
              'wr-flex wr-h-7 wr-w-[75px] wr-flex-shrink-0 wr-items-center wr-justify-center wr-rounded-[1000px] wr-bg-zinc-700 wr-font-semibold wr-text-zinc-100 wr-transition-all wr-duration-500',
              {
                'wr-bg-green-500': result.payout > 0,
                'wr-animate-fade-in': result.animation === 'fade-in',
                'wr-animate-fade-out':
                  (isMobile ? displayBets.length == 5 : displayBets.length == 9) && index == 0,
              }
            )}
          >
            {Number(result.coinSide) === CoinSide.HEADS ? (
              <img
                src={`${CDN_URL}/coin-flip-2d/doge.png`}
                width={20}
                height={20}
                alt="doge_icon"
              />
            ) : (
              <img
                src={`${CDN_URL}/coin-flip-2d/pepe.png`}
                width={20}
                height={20}
                alt="pepe_icon"
              />
            )}
            <div className="wr-ml-1 wr-text-zinc-100">
              {Number(result.coinSide) === CoinSide.HEADS ? 'DOGE' : 'PEPE'}
            </div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};
