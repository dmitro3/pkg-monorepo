'use client';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { AudioController } from '../../../../common/audio-controller';
import { BetControllerContainer } from '../../../../common/containers';
import {
  BetControllerTitle,
  BetCountFormField,
  WagerFormField,
} from '../../../../common/controller';
import { PreBetButton } from '../../../../common/pre-bet-button';
import { SkipButton } from '../../../../common/skip-button';
import { TotalWager, WagerCurrencyIcon } from '../../../../common/wager';
import { SoundEffects, useAudioEffect } from '../../../../hooks/use-audio-effect';
import { Button } from '../../../../ui/button';
import { FormLabel } from '../../../../ui/form';
import { cn } from '../../../../utils/style';
import { toDecimals, toFormatted } from '../../../../utils/web3';
import { useCoinFlipGameStore } from '../..';
import { CoinFlipForm } from '../../types';
import { CoinFlipController } from './controller';

interface Props {
  minWager: number;
  maxWager: number;
  winMultiplier: number;
  isGettingResults?: boolean;
}

export const BetController: React.FC<Props> = ({
  minWager,
  maxWager,
  winMultiplier,
  isGettingResults,
}) => {
  const form = useFormContext() as CoinFlipForm;
  const clickEffect = useAudioEffect(SoundEffects.BET_BUTTON_CLICK);

  const maxPayout = React.useMemo(() => {
    const { wager, betCount } = form.getValues();

    return toDecimals(wager * betCount * winMultiplier, 2);
  }, [form.getValues().wager, form.getValues().betCount, winMultiplier]);

  const { coinFlipGameResults, gameStatus } = useCoinFlipGameStore([
    'coinFlipGameResults',
    'gameStatus',
  ]);

  return (
    <BetControllerContainer className="wr-z-30">
      <div className="wr-flex-col wr-flex lg:wr-block lg:wr-flex-row">
        <div className="lg:wr-mb-3">
          <BetControllerTitle>Coin Flip</BetControllerTitle>
        </div>

        <WagerFormField
          minWager={minWager}
          maxWager={maxWager}
          isDisabled={
            coinFlipGameResults.length > 1 &&
            (form.formState.isSubmitting ||
              form.formState.isLoading ||
              gameStatus == 'PLAYING' ||
              isGettingResults)
          }
        />
        <CoinFlipController />
        <BetCountFormField
          isDisabled={
            coinFlipGameResults.length > 1 &&
            (form.formState.isSubmitting ||
              form.formState.isLoading ||
              gameStatus == 'PLAYING' ||
              isGettingResults)
          }
        />
        <div className="wr-mb-6 wr-grid-cols-2 wr-gap-2 lg:!wr-grid wr-hidden">
          <div>
            <FormLabel>Max Payout</FormLabel>
            <div
              className={cn(
                'wr-flex wr-w-full wr-items-center wr-gap-1 wr-rounded-lg wr-bg-zinc-800 wr-px-2 wr-py-[10px] wr-overflow-hidden'
              )}
            >
              <WagerCurrencyIcon />
              <span className={cn('wr-font-semibold wr-text-zinc-100')}>
                ${toFormatted(maxPayout, 2)}
              </span>
            </div>
          </div>
          <div>
            <FormLabel>Total Wager</FormLabel>
            <TotalWager betCount={form.getValues().betCount} wager={form.getValues().wager} />
          </div>
        </div>
        {!(coinFlipGameResults.length > 3) && (
          <PreBetButton>
            <Button
              type="submit"
              variant={'success'}
              className={cn(
                'wr-w-full wr-uppercase wr-transition-all wr-duration-300 active:wr-scale-[85%] wr-select-none',
                {
                  'wr-cursor-default wr-pointer-events-none':
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    form.formState.isLoading ||
                    (gameStatus == 'PLAYING' &&
                      coinFlipGameResults.length < 4 &&
                      coinFlipGameResults.length > 1) ||
                    isGettingResults,
                }
              )}
              size={'xl'}
              onClick={() => clickEffect.play()}
            >
              Bet
            </Button>
          </PreBetButton>
        )}
        {coinFlipGameResults.length > 3 && gameStatus == 'PLAYING' && <SkipButton />}
      </div>
      <footer className="wr-flex wr-items-center wr-justify-between lg:wr-mt-4">
        <AudioController />
      </footer>
    </BetControllerContainer>
  );
};
