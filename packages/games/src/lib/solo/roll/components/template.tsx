"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  ALL_DICES,
  LUCK_MULTIPLIER,
  MAX_BET_COUNT,
  MIN_BET_COUNT,
} from "../constant";
import { DICE } from "../types";
import { toDecimals } from "../../../utils/web3";
import { Form } from "../../../ui/form";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { BetController } from "./bet-controller";
import { Roll } from "..";
import { cn } from "../../../utils/style";
import { RollGameProps } from "./game";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = RollGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onSubmit: (data: any) => void;
};

const RollTemplate = ({ ...props }: TemplateProps) => {
  const options = { ...props.options };

  const formSchema = z.object({
    wager: z
      .number()
      .min(props?.minWager || 2, {
        message: `Minimum wager is ${props?.minWager}`,
      })
      .max(props?.maxWager || 2000, {
        message: `Maximum wager is ${props?.maxWager}`,
      }),
    betCount: z
      .number()
      .min(MIN_BET_COUNT, { message: "Minimum bet count is 1" })
      .max(MAX_BET_COUNT, {
        message: "Maximum bet count is 100",
      }),
    stopGain: z.number(),
    stopLoss: z.number(),
    dices: z
      .array(z.nativeEnum(DICE))
      .nonempty()
      .min(1, {
        message: "You have to select at least one dice.",
      })
      .max(5, {
        message: "You can select up to 5 dices.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "all",
    defaultValues: {
      wager: 2,
      betCount: 1,
      stopGain: 0,
      stopLoss: 0,
      dices: [],
    },
  });

  const dices = form.watch("dices");

  const { winMultiplier, winChance } = React.useMemo(() => {
    if (!dices.length)
      return {
        winChance: 0,
        winMultiplier: 0,
      };

    return {
      winMultiplier: toDecimals(
        (ALL_DICES.length / dices.length) * LUCK_MULTIPLIER,
        4
      ),
      winChance: toDecimals((dices.length * 100) / ALL_DICES.length, 2),
    };
  }, [dices]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <GameContainer>
          <BetController
            maxWager={props?.maxWager || 10}
            minWager={props?.minWager || 2}
            winMultiplier={winMultiplier}
          />

          <SceneContainer
            className={cn(
              "wr-h-[640px] max-md:wr-h-[425px] lg:wr-py-12 wr-relative"
            )}
            style={{
              backgroundImage: options?.scene?.backgroundImage,
            }}
          >
            <Roll.Game {...props}>
              <Roll.LastBets />
              <Roll.GameArea {...props} />
              <Roll.RollController
                multiplier={winMultiplier}
                winChance={winChance}
              />
            </Roll.Game>
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default RollTemplate;
