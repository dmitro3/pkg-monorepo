'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  AutoBetCountFormField,
  AutoBetIncreaseOnLoss,
  AutoBetIncreaseOnWin,
  AutoBetStopGainFormField,
  AutoBetStopLossFormField,
  WagerFormField,
} from '../../../../common/controller';
import { PreBetButton } from '../../../../common/pre-bet-button';
import { CDN_URL } from '../../../../constants';
import { useGameOptions } from '../../../../game-provider';
import { SoundEffects, useAudioEffect } from '../../../../hooks/use-audio-effect';
import { Button } from '../../../../ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '../../../../ui/form';
import { NumberInput } from '../../../../ui/number-input';
import { cn } from '../../../../utils/style';
import useMinesGameStateStore from '../../store';
import { MINES_GAME_STATUS, MinesForm } from '../../types';
import MinesCountButton from '../count-button';

interface AutoControllerProps {
  isGettingResults?: boolean;
  minWager: number;
  maxWager: number;
  isAutoBetMode: boolean;
  onAutoBetModeChange: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin?: () => void;
}

export const AutoController = ({
  minWager,
  maxWager,
  isAutoBetMode,
  onAutoBetModeChange,
  onLogin,
}: AutoControllerProps) => {
  const form = useFormContext() as MinesForm;
  const clickEffect = useAudioEffect(SoundEffects.BET_BUTTON_CLICK);

  const isDisabled = form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode;

  const { gameStatus } = useMinesGameStateStore(['updateMinesGameState', 'gameStatus', 'board']);

  const { account } = useGameOptions();

  return (
    <div className="wr-flex wr-flex-col">
      <WagerFormField
        className="wr-mb-3 lg:wr-mb-6"
        minWager={minWager}
        maxWager={maxWager}
        isDisabled={gameStatus !== MINES_GAME_STATUS.IDLE}
      />

      <FormField
        control={form.control}
        name="minesCount"
        render={({ field }) => {
          return (
            <FormItem
              className={cn({
                'wr-mb-0 lg:wr-mb-6': account?.isLoggedIn || !!account?.balanceAsDollar,
                'wr-mb-3 lg:wr-mb-6': !account?.isLoggedIn || !account?.balanceAsDollar,
              })}
            >
              <FormLabel className="wr-mb-3 lg:wr-mb-[6px] wr-leading-4 lg:wr-leading-6">
                Mines Count (1 - 24)
              </FormLabel>
              <NumberInput.Root
                {...field}
                errorClassName="wr-hidden lg:wr-block"
                className="wr-relative wr-flex wr-items-center wr-gap-2"
                isDisabled={gameStatus !== MINES_GAME_STATUS.IDLE}
              >
                <NumberInput.Container className="wr-bg-zinc-950">
                  <img
                    alt="mine_icon"
                    width={17}
                    height={17}
                    src={`${CDN_URL}/mines/mine-icon.png`}
                  />
                  <NumberInput.Input className="wr-text-sm wr-font-semibold" />
                </NumberInput.Container>
                <div className="wr-flex wr-flex-shrink-0 wr-items-center wr-justify-between wr-gap-1">
                  <MinesCountButton
                    value={3}
                    minesCount={field.value}
                    form={form}
                    isDisabbled={gameStatus !== MINES_GAME_STATUS.IDLE}
                  />
                  <MinesCountButton
                    value={5}
                    minesCount={field.value}
                    form={form}
                    isDisabbled={gameStatus !== MINES_GAME_STATUS.IDLE}
                  />
                  <MinesCountButton
                    value={10}
                    minesCount={field.value}
                    form={form}
                    isDisabbled={gameStatus !== MINES_GAME_STATUS.IDLE}
                  />
                  <MinesCountButton
                    value={20}
                    minesCount={field.value}
                    form={form}
                    isDisabbled={gameStatus !== MINES_GAME_STATUS.IDLE}
                  />
                </div>
                <FormMessage className="wr-absolute wr-left-0 wr-top-12" />
              </NumberInput.Root>
            </FormItem>
          );
        }}
      />

      <div className="wr-order-2 lg:wr-order-none wr-flex wr-gap-2 lg:wr-flex-col lg:wr-gap-0">
        <AutoBetCountFormField
          isDisabled={form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode}
        />
        <div className="wr-flex wr-gap-2 md:wr-gap-3">
          <AutoBetIncreaseOnWin
            isDisabled={form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode}
            showSm
          />
          <AutoBetIncreaseOnLoss
            isDisabled={form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode}
            showSm
          />
        </div>
      </div>

      <div className="wr-order-3 lg:wr-order-none wr-flex wr-gap-3">
        <AutoBetStopGainFormField
          isDisabled={form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode}
        />
        <AutoBetStopLossFormField
          isDisabled={form.formState.isSubmitting || form.formState.isLoading || isAutoBetMode}
        />
      </div>

      <PreBetButton onLogin={onLogin} className="wr-mb-3 lg:wr-mb-0">
        <Button
          type={!isAutoBetMode ? 'button' : 'submit'}
          variant={'success'}
          className={cn(
            'wr-w-full wr-uppercase wr-transition-all wr-duration-300 active:wr-scale-[85%] wr-select-none wr-mb-3 lg:wr-mb-0 wr-order-1 lg:wr-order-none',
            {
              'wr-cursor-default wr-pointer-events-none':
                !form.formState.isValid || form.formState.isSubmitting || form.formState.isLoading,
            }
          )}
          size={'xl'}
          onClick={() => {
            clickEffect.play();
            onAutoBetModeChange(!isAutoBetMode);
          }}
        >
          {isAutoBetMode ? 'Stop Autobet' : 'Start Autobet'}
        </Button>
      </PreBetButton>
    </div>
  );
};
