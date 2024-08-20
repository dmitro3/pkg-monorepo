'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  AutoBetCountFormField,
  AutoBetIncreaseOnLoss,
  AutoBetIncreaseOnWin,
  AutoBetStopGainFormField,
  AutoBetStopLossFormField,
  AutoBetWagerFormField,
} from '../../../../common/controller';
import { PreBetButton } from '../../../../common/pre-bet-button';
import { SoundEffects, useAudioEffect } from '../../../../hooks/use-audio-effect';
import { Button } from '../../../../ui/button';
import { cn } from '../../../../utils/style';
import useDiceGameStore from '../../store';
import { DiceForm } from '../../types';

interface AutoControllerProps {
  winMultiplier: number;
  isGettingResults?: boolean;
  minWager: number;
  maxWager: number;
}

export const AutoController = ({ isGettingResults, minWager, maxWager }: AutoControllerProps) => {
  const form = useFormContext() as DiceForm;
  const clickEffect = useAudioEffect(SoundEffects.BET_BUTTON_CLICK);

  const { gameStatus, diceGameResults } = useDiceGameStore(['gameStatus', 'diceGameResults']);

  return (
    <>
      <AutoBetWagerFormField
        minWager={minWager}
        maxWager={maxWager}
        className="lg:!wr-mb-3"
        isDisabled={
          form.formState.isSubmitting ||
          form.formState.isLoading ||
          gameStatus == 'PLAYING' ||
          isGettingResults
        }
      />

      <AutoBetCountFormField />
      <AutoBetIncreaseOnWin />
      <AutoBetIncreaseOnLoss />

      <div className="wr-flex wr-gap-3">
        <AutoBetStopGainFormField />
        <AutoBetStopLossFormField />
      </div>

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
                  diceGameResults.length < 4 &&
                  diceGameResults.length > 1) ||
                isGettingResults,
            }
          )}
          size={'xl'}
          onClick={() => clickEffect.play()}
        >
          Start Autobet
        </Button>
      </PreBetButton>
    </>
  );
};
