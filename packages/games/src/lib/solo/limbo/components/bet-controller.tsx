"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { toDecimals } from "../../../utils/web3";
import { BetControllerContainer } from "../../../common/containers";
import {
  BetControllerTitle,
  BetCountFormField,
  StopGainFormField,
  StopLossFormField,
  WagerFormField,
} from "../../../common/controller";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { NumberInput } from "../../../ui/number-input";
import { cn } from "../../../utils/style";
import { TotalWager, WagerCurrencyIcon } from "../../../common/wager";
import { Advanced } from "../../../common/advanced";
import { PreBetButton } from "../../../common/pre-bet-button";
import { Button } from "../../../ui/button";
import { AudioController } from "../../../common/audio-controller";
import * as Slider from "@radix-ui/react-slider";
import { LimboForm } from "../types";

interface Props {
  minWager: number;
  maxWager: number;
  winMultiplier: number;
}

export const BetController: React.FC<Props> = ({
  minWager,
  maxWager,
  winMultiplier,
}) => {
  const form = useFormContext() as LimboForm;

  const maxPayout = React.useMemo(() => {
    const { wager, betCount } = form.getValues();

    return toDecimals(wager * betCount * winMultiplier, 2);
  }, [form.getValues().wager, form.getValues().betCount, winMultiplier]);

  return (
    <BetControllerContainer>
      <div className="max-lg:flex max-lg:flex-col">
        <div className="mb-3">
          <BetControllerTitle>Limbo</BetControllerTitle>
        </div>

        <WagerFormField minWager={minWager} maxWager={maxWager} />
        <BetCountFormField />
        <>
          <FormField
            control={form.control}
            name="limboMultiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Multiplier (1.1-{100}) </FormLabel>

                <FormControl>
                  <div>
                    <NumberInput.Root {...field}>
                      <NumberInput.Container
                        className={cn(
                          " rounded-b-[6px] border-none bg-zinc-950 px-2  py-[10px]"
                        )}
                      >
                        <NumberInput.Input
                          className={cn(
                            "rounded-none border-none  bg-transparent px-0 py-2 text-base font-semibold leading-5 text-white outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          )}
                        />
                      </NumberInput.Container>
                    </NumberInput.Root>
                    <Slider.Root
                      className={cn(
                        "relative -mt-2 flex w-full touch-none select-none items-center"
                      )}
                      min={1.1}
                      value={[field.value]}
                      max={100}
                      step={1}
                      onValueChange={(e: any) => {
                        form.setValue("limboMultiplier", e[0], {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <Slider.Track className="relative h-[6px] w-full grow cursor-pointer overflow-hidden rounded-full rounded-tl-md rounded-tr-md bg-zinc-600">
                        <Slider.Range className="absolute h-full bg-red-600" />
                      </Slider.Track>
                      <Slider.Thumb className="border-primary ring-offset-background focus-visible:ring-ring flex  h-[10px] w-[10px] cursor-pointer items-center justify-center rounded-full border-2 bg-white text-[12px] font-medium text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                    </Slider.Root>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <div className="mb-6 grid grid-cols-2 gap-2">
          <div>
            <FormLabel>Max Payout</FormLabel>
            <div
              className={cn(
                "flex w-full items-center gap-1 rounded-lg bg-zinc-800 px-2 py-[10px]"
              )}
            >
              <WagerCurrencyIcon />
              <span className={cn("font-semibold text-zinc-100")}>
                ${maxPayout}
              </span>
            </div>
          </div>
          <div>
            <FormLabel>Total Wager</FormLabel>
            <TotalWager
              betCount={form.getValues().betCount}
              wager={form.getValues().wager}
            />
          </div>
        </div>

        <div>
          <Advanced>
            <div className="grid grid-cols-2 gap-2">
              <StopGainFormField />
              <StopLossFormField />
            </div>
          </Advanced>
        </div>
        <PreBetButton>
          <Button
            type="submit"
            variant={"success"}
            className="w-full max-lg:-order-1 max-lg:mb-3.5"
            size={"xl"}
            disabled={
              !form.formState.isValid ||
              form.formState.isSubmitting ||
              form.formState.isLoading
            }
            isLoading={form.formState.isSubmitting || form.formState.isLoading}
          >
            Bet
          </Button>
        </PreBetButton>
      </div>
      <footer className="flex items-center justify-between">
        <AudioController />
      </footer>
    </BetControllerContainer>
  );
};
