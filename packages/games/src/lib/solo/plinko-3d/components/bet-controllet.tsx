"use client";

import * as Slider from "@radix-ui/react-slider";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Advanced } from "../../../common/advanced";
import { UnityAudioController } from "../../../common/audio-controller";
import { UnityBetControllerContainer } from "../../../common/containers";
import {
  BetControllerTitle,
  StopGainFormField,
  StopLossFormField,
  UnityBetCountFormField,
  UnityWagerFormField,
} from "../../../common/controller";
import { PreBetButton } from "../../../common/pre-bet-button";
import { TotalWager, WagerCurrencyIcon } from "../../../common/wager";
import { Button } from "../../../ui/button";
import { FormLabel } from "../../../ui/form";
import { cn } from "../../../utils/style";
import { toDecimals } from "../../../utils/web3";
import { Plinko3dForm } from "../types";
import PlinkoRow from "./plinko-row";
import { rowMultipliers } from "../constants";

type Props = {
  minWager: number;
  maxWager: number;
  count: number;
  status: "idle" | "playing" | "success";
};

export const BetController: React.FC<Props> = ({
  minWager,
  maxWager,
  count,
  status,
}) => {
  const form = useFormContext() as Plinko3dForm;

  const wager = form.watch("wager");

  const betCount = form.watch("betCount");

  const rowSize = form.watch("plinkoSize");

  const maxPayout = React.useMemo(() => {
    const maxMultiplier = isNaN(rowMultipliers?.[rowSize]?.[0] || 0)
      ? 0
      : rowMultipliers?.[rowSize]?.[0];

    return toDecimals(wager * betCount * maxMultiplier, 2);
  }, [betCount, wager, rowSize]);

  return (
    <UnityBetControllerContainer className="no-scrollbar relative z-[20] flex h-full max-h-full w-full flex-col justify-between overflow-auto lg:absolute lg:left-0 lg:top-0 lg:w-[264px]">
      <div className="max-lg:flex max-lg:flex-col">
        <div className="mb-6 max-lg:hidden">
          <BetControllerTitle>
            <img
              src={"/images/games/plinko/plinko.png"}
              width={103.47}
              height={19.6}
              alt="game_logo"
            />
          </BetControllerTitle>
        </div>

        <UnityWagerFormField minWager={minWager} maxWager={maxWager} />
        <div className="relative">
          <UnityBetCountFormField>(1 - 100)</UnityBetCountFormField>
          <Slider.Root
            className={cn(
              "absolute left-0 top-[65px] flex w-full touch-none select-none items-center px-1.5"
            )}
            min={1}
            value={[form.getValues("betCount")]}
            max={100}
            onValueChange={(e: any) => {
              form.setValue("betCount", e[0], { shouldValidate: true });
            }}
          >
            <Slider.Track className="relative h-1 w-full grow cursor-pointer overflow-hidden rounded-full  bg-zinc-600">
              <Slider.Range className="absolute h-full bg-sky-400" />
            </Slider.Track>
            <Slider.Thumb className="border-primary ring-offset-background focus-visible:ring-ring flex  h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-white text-[12px] font-medium text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </Slider.Root>
        </div>

        <PlinkoRow />
        <div className="mb-6 grid grid-cols-2 gap-2">
          <div>
            <FormLabel className="text-unity-white-50">Max Payout</FormLabel>
            <div
              className={cn(
                "flex w-full items-center gap-1 rounded-lg bg-zinc-800 px-2 py-[10px] ",
                "border border-solid border-unity-white-15 bg-unity-white-15 backdrop-blur-md"
              )}
            >
              <WagerCurrencyIcon />
              <span className={cn("font-semibold text-zinc-100")}>
                ${maxPayout}
              </span>
            </div>
          </div>
          <div>
            <FormLabel className="text-unity-white-50">Total Wager</FormLabel>
            <TotalWager
              betCount={form.getValues().betCount}
              wager={form.getValues().wager}
              containerClassName="border border-solid border-unity-white-15 bg-unity-white-15 backdrop-blur-md"
            />
          </div>
        </div>

        <div>
          <Advanced>
            <div className="grid grid-cols-2 gap-2">
              <StopGainFormField
                labelClassName="text-unity-white-50"
                inputContainerClassName={cn(
                  "border border-solid border-unity-white-15 bg-unity-white-15 backdrop-blur-md"
                )}
              />
              <StopLossFormField
                labelClassName="text-unity-white-50"
                inputContainerClassName={cn(
                  "border border-solid border-unity-white-15 bg-unity-white-15 backdrop-blur-md"
                )}
              />
            </div>
          </Advanced>
        </div>
        <PreBetButton variant={"plinko"}>
          <Button
            type="submit"
            variant="plinko"
            className="w-full !rounded-none max-lg:-order-2 max-lg:mb-3.5"
            size={"xl"}
            disabled={
              !form.formState.isValid ||
              form.formState.isSubmitting ||
              form.formState.isLoading ||
              count !== 0 ||
              status !== "idle"
            }
            isLoading={form.formState.isSubmitting || form.formState.isLoading}
          >
            Play
          </Button>
        </PreBetButton>
      </div>
      <footer className="mt-auto flex items-center justify-between">
        <UnityAudioController />
      </footer>
    </UnityBetControllerContainer>
  );
};
