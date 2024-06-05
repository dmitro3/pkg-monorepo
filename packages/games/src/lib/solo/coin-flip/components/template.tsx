"use client";

import { useForm } from "react-hook-form";
import {
  CoinSide,
  MAX_BET_COUNT,
  MIN_BET_COUNT,
  WIN_MULTIPLIER,
} from "../constants";
import { CoinFlipGameProps } from "./game";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { BetController } from "./bet-controller";
import { CoinFlip, CoinFlipFormFields } from "..";
import { cn } from "../../../utils/style";
import { Form } from "../../../ui/form";
import debounce from "debounce";
import React from "react";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = CoinFlipGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onSubmitGameForm: (data: CoinFlipFormFields) => void;
  onFormChange: (fields: CoinFlipFormFields) => void;
};

const CoinFlipTemplate = ({ ...props }: TemplateProps) => {
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
    coinSide: z.nativeEnum(CoinSide),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "onSubmit",
    defaultValues: {
      wager: props?.minWager || 2,
      betCount: 1,
      stopGain: 0,
      stopLoss: 0,
      coinSide: CoinSide.HEADS,
    },
  });

  React.useEffect(() => {
    const debouncedCb = debounce(
      (formFields) => props.onFormChange(formFields),
      300
    );

    const subscription = form.watch(debouncedCb);

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmitGameForm)}>
        <GameContainer>
          <BetController
            minWager={props.minWager || 2}
            maxWager={props.maxWager || 10}
            winMultiplier={WIN_MULTIPLIER}
          />
          <SceneContainer
            className={cn(
              "wr-h-[640px] max-md:wr-h-[425px] lg:wr-py-12 wr-relative"
            )}
            style={{
              backgroundImage: options?.scene?.backgroundImage,
            }}
          >
            <CoinFlip.Body>
              <CoinFlip.Game {...props}>
                <CoinFlip.LastBets />
                <CoinFlip.Coin {...props} />
                <div className="wr-hidden lg:wr-block">
                  <CoinFlip.Controller />
                </div>
              </CoinFlip.Game>
            </CoinFlip.Body>
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default CoinFlipTemplate;
