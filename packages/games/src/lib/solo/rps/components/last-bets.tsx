import React from 'react';
import { useFormContext } from 'react-hook-form';

import { LastBetsContainer } from '../../../common/last-bets-container';
import useMediaQuery from '../../../hooks/use-media-query';
import { RpsArrowRightSm, RpsPaperSm, RpsRockSm, RpsScissorsSm } from '../../../svgs';
import { cn } from '../../../utils/style';
import useRpsGameStore from '../store';
import { RockPaperScissors, RPSForm } from '../types';

const MiniRPSIcon = ({ rps }: { rps: string }) => {
  switch (rps) {
    case RockPaperScissors.PAPER:
      return <RpsPaperSm />;

    case RockPaperScissors.SCISSORS:
      return <RpsScissorsSm />;

    case RockPaperScissors.ROCK:
      return <RpsRockSm />;

    default:
      break;
  }
};

const LastBets = () => {
  const { lastBets } = useRpsGameStore(['lastBets']);
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

  const form = useFormContext() as RPSForm;
  const rpsChoice = form.watch('rpsChoice');

  return (
    <LastBetsContainer className="wr-absolute wr-top-3 wr-z-10 wr-max-w-full max-md:wr-scale-90">
      {displayBets?.map((result, index) => {
        return (
          <div
            key={`${index}-${result.rps.toString()}`}
            className={cn(
              'wr-flex wr-h-8 wr-w-[80px] wr-flex-shrink-0 wr-items-center wr-justify-center wr-rounded-[1000px] wr-bg-zinc-700  wr-font-semibold wr-text-zinc-100 wr-transition-all wr-duration-500',
              {
                'wr-bg-green-500': result.payout > 0,
                'wr-bg-yellow-500': result.rps.toString() === rpsChoice.toString(),
                'wr-animate-fade-in': result.animation === 'fade-in',
                'wr-animate-fade-out':
                  (isMobile ? displayBets.length == 5 : displayBets.length == 9) && index == 0,
              }
            )}
          >
            <div className="wr-flex wr-items-center">
              <MiniRPSIcon rps={result.rps.toString()} />
              <RpsArrowRightSm />
              <MiniRPSIcon rps={rpsChoice} />
            </div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};

export default LastBets;
