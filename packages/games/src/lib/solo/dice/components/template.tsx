'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { cn } from '../../../../lib/utils/style';
import { GameContainer, SceneContainer } from '../../../common/containers';
import { useGameOptions } from '../../../game-provider';
import * as Strategist from '../../../strategist';
import * as Action from '../../../strategist/items/action';
import * as Profit from '../../../strategist/items/profit';
import { Form } from '../../../ui/form';
import { toDecimals } from '../../../utils/web3';
import { LUCK_MULTIPLIER, MAX_BET_COUNT, MAX_VALUE, MIN_BET_COUNT, MIN_VALUE } from '../constant';
import { Dice } from '../index';
import { DiceFormFields, DiceGameResult } from '../types';
import { BetController } from './bet-controller';
import { RangeGameProps } from './game';
import { SliderTrackOptions } from './slider';

function parseToBigInt(floatValue: number, precision: number) {
  const scaledValue = floatValue * Math.pow(10, precision);
  const integerValue = Math.round(scaledValue);

  return BigInt(integerValue);
}

type TemplateOptions = {
  slider?: {
    track?: SliderTrackOptions;
  };
};

type TemplateProps = RangeGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onSubmitGameForm: (data: DiceFormFields) => void;
  onFormChange: (fields: DiceFormFields) => void;
};

const defaultOptions: TemplateOptions = {
  slider: {
    track: {
      color: '#DC2626',
      activeColor: '#22c55e',
    },
  },
};

const DiceTemplate = ({ ...props }: TemplateProps) => {
  const options = { ...defaultOptions, ...props.options };
  const [isAutoBetMode, setIsAutoBetMode] = React.useState<boolean>(false);
  const { account } = useGameOptions();
  const balanceAsDollar = account?.balanceAsDollar || 0;

  const formSchema = z.object({
    wager: z
      .number()
      .min(props?.minWager || 1, {
        message: `Minimum wager is ${props?.minWager}`,
      })
      .max(props?.maxWager || 2000, {
        message: `Maximum wager is ${props?.maxWager}`,
      }),
    betCount: z
      .number()
      .min(MIN_BET_COUNT, { message: 'Minimum bet count is 1' })
      .max(MAX_BET_COUNT, {
        message: 'Maximum bet count is 100',
      }),
    stopGain: z.number(),
    stopLoss: z.number(),
    increaseOnWin: z.number(),
    increaseOnLoss: z.number(),
    rollValue: z.number().min(MIN_VALUE).max(MAX_VALUE),
    rollType: z.enum(['OVER', 'UNDER']),
    winChance: z.number().min(MIN_VALUE).max(MAX_VALUE),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: 'onSubmit',
    defaultValues: {
      wager: props?.minWager || 1,
      betCount: 0,
      stopGain: 0,
      stopLoss: 0,
      increaseOnWin: 0,
      increaseOnLoss: 0,
      rollType: 'UNDER',
      rollValue: 50,
      winChance: 50,
    },
  });

  const winChance = form.watch('winChance');

  const winMultiplier = useMemo(() => {
    return toDecimals((100 / winChance) * LUCK_MULTIPLIER, 2);
  }, [winChance]);

  React.useEffect(() => {
    const cb = (formFields: any) => {
      props?.onFormChange && props.onFormChange(formFields);
    };

    const subscription = form.watch(cb);

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // strategy
  const wager = form.watch('wager');
  const increasePercentageOnWin = form.watch('increaseOnWin');
  const increasePercentageOnLoss = form.watch('increaseOnLoss');
  const stopProfit = form.watch('stopGain');
  const stopLoss = form.watch('stopLoss');

  const strategist = React.useMemo(() => {
    const stopStrategyItems = [];
    // stop action and conditions
    const stopOnProfitCondition = Profit.toCondition({
      type: Profit.ProfitType.Profit,
      term: Profit.ProfitTerm.GreaterThanOrEqualTo,
      amount: parseToBigInt(stopProfit, 8),
    });

    const stopOnLossCondition = Profit.toCondition({
      type: Profit.ProfitType.Lost,
      term: Profit.ProfitTerm.GreaterThan,
      amount: parseToBigInt(stopLoss, 8),
    });

    const stopAction = Action.toAction({
      amount: 0n,
      option: Action.Option.Stop,
    });

    stopProfit > 0 &&
      stopStrategyItems.push({
        condition: stopOnProfitCondition,
        action: stopAction,
      });
    stopLoss > 0 &&
      stopStrategyItems.push({
        condition: stopOnLossCondition,
        action: stopAction,
      });

    // profit on win condition and action
    const profitOnWin = Profit.toCondition({
      type: Profit.ProfitType.Profit,
      term: Profit.ProfitTerm.GreaterThan,
      amount: 0n,
    });
    const profitOnWinAction = Action.toAction({
      amount: parseToBigInt(
        increasePercentageOnWin < 0 ? increasePercentageOnWin * -1 : increasePercentageOnWin,
        6
      ),
      option:
        increasePercentageOnWin < 0
          ? Action.Option.DecreaseByPercentage
          : Action.Option.IncreaseByPercentage,
    });

    // profit on loss condition and action
    const profitOnLoss = Profit.toCondition({
      type: Profit.ProfitType.Lost,
      term: Profit.ProfitTerm.GreaterThan,
      amount: 0n,
    });

    const profitOnLossAction = Action.toAction({
      amount: parseToBigInt(
        increasePercentageOnLoss < 0 ? increasePercentageOnLoss * -1 : increasePercentageOnLoss,
        6
      ),
      option:
        increasePercentageOnLoss < 0
          ? Action.Option.DecreaseByPercentage
          : Action.Option.IncreaseByPercentage,
    });

    return Strategist.load({
      items: [
        ...stopStrategyItems,
        {
          condition: profitOnWin,
          action: profitOnWinAction,
        },
        {
          condition: profitOnLoss,
          action: profitOnLossAction,
        },
      ],
      wager: parseToBigInt(wager, 8),
      balance: parseToBigInt(balanceAsDollar, 8),
    });
  }, [
    increasePercentageOnWin,
    increasePercentageOnLoss,
    wager,
    balanceAsDollar,
    stopProfit,
    stopLoss,
  ]);

  const processStrategy = (result: DiceGameResult[]) => {
    const payout = result[0]?.payoutInUsd || 0;
    const p = strategist.process(parseToBigInt(wager, 8), parseToBigInt(payout, 8));
    const newWager = Number(p.wager) / 1e8;
    if (p.action && !p.action.isStop()) {
      form.setValue('wager', newWager);
    }

    if (p.action && p.action.isStop()) {
      setIsAutoBetMode(false);
      return;
    }

    if (newWager < (props.minWager || 0) || balanceAsDollar < newWager) {
      setIsAutoBetMode(false);
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmitGameForm)}>
        <GameContainer>
          <BetController
            minWager={props.minWager || 1}
            maxWager={props.maxWager || 2000}
            winMultiplier={winMultiplier}
            isAutoBetMode={isAutoBetMode}
            onAutoBetModeChange={setIsAutoBetMode}
          />
          <SceneContainer
            className={cn('wr-h-[640px]  max-md:wr-h-auto max-md:wr-pt-[130px] lg:wr-py-12')}
          >
            <Dice.Game
              {...props}
              processStrategy={processStrategy}
              isAutoBetMode={isAutoBetMode}
              onAutoBetModeChange={setIsAutoBetMode}
            >
              {/* last bets */}
              <div />
              <Dice.Body>
                <Dice.LastBets />
                <Dice.TextRandomizer />
                <Dice.Slider track={options?.slider?.track} />
              </Dice.Body>
              <Dice.Controller disabled={isAutoBetMode} winMultiplier={winMultiplier} />
            </Dice.Game>
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default DiceTemplate;
