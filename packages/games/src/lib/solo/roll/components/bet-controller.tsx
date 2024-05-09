"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { DiceForm } from "../constant";
import { toDecimals } from "../../../utils/web3";
import { BetControllerContainer } from "../../../common/containers";
import {
  BetControllerTitle,
  BetCountFormField,
  StopGainFormField,
  StopLossFormField,
  WagerFormField,
} from "../../../common/controller";
import { FormLabel } from "../../../ui/form";
import { cn } from "../../../utils/style";
import { TotalWager, WagerCurrencyIcon } from "../../../common/wager";
import { Advanced } from "../../../common/advanced";
import { PreBetButton } from "../../../common/pre-bet-button";
import { Button } from "../../../ui/button";
import { AudioController } from "../../../common/audio-controller";

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
  const form = useFormContext() as DiceForm;

  const wager = form.watch("wager");

  const betCount = form.watch("betCount");

  const isFormInProgress =
    form.formState.isSubmitting || form.formState.isLoading;

  const maxPayout = React.useMemo(() => {
    return toDecimals(wager * betCount * winMultiplier, 2);
  }, [wager, betCount, winMultiplier]);

  return (
    <BetControllerContainer>
      <div className="wr-max-lg:flex wr-max-lg:flex-col">
        <div className="wr-mb-3">
          <BetControllerTitle>Roll</BetControllerTitle>
        </div>

        <WagerFormField
          minWager={minWager}
          maxWager={maxWager}
          isDisabled={isFormInProgress}
        />
        <BetCountFormField isDisabled={isFormInProgress} />
        <div className="wr-mb-6 wr-grid wr-grid-cols-2 wr-gap-2">
          <div>
            <FormLabel>Max Payout</FormLabel>
            <div
              className={cn(
                "wr-flex wr-w-full wr-items-center wr-gap-1 wr-rounded-lg wr-bg-zinc-800 wr-px-2 wr-py-[10px]"
              )}
            >
              <WagerCurrencyIcon />
              <span className={cn("wr-font-semibold wr-text-zinc-100")}>
                ${maxPayout}
              </span>
            </div>
          </div>
          <div>
            <FormLabel>Total Wager</FormLabel>
            <TotalWager betCount={betCount} wager={wager} />
          </div>
        </div>

        <div>
          <Advanced>
            <div className="wr-grid wr-grid-cols-2 wr-gap-2">
              <StopGainFormField isDisabled={isFormInProgress} />
              <StopLossFormField isDisabled={isFormInProgress} />
            </div>
          </Advanced>
        </div>
        <PreBetButton>
          <Button
            type="submit"
            variant={"success"}
            className="wr-w-full wr-max-lg:-order-1 wr-max-lg:mb-3.5"
            size={"xl"}
            disabled={!form.formState.isValid || isFormInProgress}
            isLoading={isFormInProgress}
          >
            Bet
          </Button>
        </PreBetButton>
      </div>
      <footer className="wr-flex wr-items-center wr-justify-between">
        <AudioController />
      </footer>
    </BetControllerContainer>
  );
};
