"use client";
import * as React from "react";

import {
  FormLabel,
  Button,
  cn,
  toDecimals,
  FormField,
  FormItem,
  FormControl,
  toFormatted,
} from "@winrlabs/ui";
import { useFormContext } from "react-hook-form";
import { Advanced } from "../../../../common/advanced";
import { TotalWager } from "../../../../common/wager";
import {
  BetControllerTitle,
  BetCountFormField,
  StopGainFormField,
  StopLossFormField,
  WagerFormField,
} from "../../../../common/controller";
import { BetControllerContainer } from "../../../../common/containers";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CoinFlipForm } from "../../_types";
import { CoinSide, WIN_MULTIPLIER } from "../../_constants";

// import { AudioController } from "@/components/common/audio-controller";
// import { PreBetButton } from "@/app/(games)/_components/bet-button";

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
  const form = useFormContext() as CoinFlipForm;

  const wager = form.watch("wager");

  const maxPayout = React.useMemo(() => {
    const { wager, betCount } = form.getValues();

    return toDecimals(wager * betCount * winMultiplier, 2);
  }, [form.getValues().wager, form.getValues().betCount, winMultiplier]);

  const coinSide = form.watch("coinSide");

  React.useEffect(() => {
    console.log(coinSide, "coinside");
  }, [coinSide]);

  return (
    <BetControllerContainer>
      <div className="max-lg:flex max-lg:flex-col">
        <div className="mb-3">
          <BetControllerTitle>Coin Flip</BetControllerTitle>
        </div>

        <WagerFormField
          minWager={minWager}
          maxWager={maxWager}
          isDisabled={form.formState.isSubmitting || form.formState.isLoading}
        />
        <div className="flex items-center mb-12">
          <FormField
            control={form.control}
            name="coinSide"
            render={({ field }) => (
              <FormItem className="mb-0 h-10 max-lg:w-full">
                <FormControl>
                  <RadioGroupPrimitive.Root
                    onValueChange={field.onChange}
                    className="grid h-full w-full grid-cols-2 items-center justify-center gap-0 rounded-md bg-unity-white-15 font-semibold lg:w-[412px]"
                    defaultValue={field.value as unknown as string}
                  >
                    <FormItem className="mb-0 h-full text-center">
                      <FormControl>
                        <>
                          <RadioGroupPrimitive.Item
                            value={CoinSide.HEADS as unknown as string}
                            className="relative flex h-full w-full items-center justify-center gap-1 text-unity-white-50"
                          >
                            <img
                              src="/images/tokens/weth.png"
                              width={20}
                              height={20}
                              alt="eth_icon"
                            />
                            ETH
                            <RadioGroupPrimitive.Indicator className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-md bg-gradient-to-t from-unity-coinflip-purple-700 to-unity-coinflip-purple-400 text-zinc-100">
                              <img
                                src="/images/tokens/weth.png"
                                width={20}
                                height={20}
                                alt="eth_icon"
                              />
                              ETH
                            </RadioGroupPrimitive.Indicator>
                          </RadioGroupPrimitive.Item>
                          <span
                            className={cn(
                              "relative top-2 flex items-center justify-center gap-1 text-zinc-100",
                              {
                                "text-lime-500": field.value === CoinSide.HEADS,
                                "text-red-500": field.value === CoinSide.TAILS,
                              }
                            )}
                          >
                            {field.value === CoinSide.HEADS
                              ? `+$${toFormatted(wager * WIN_MULTIPLIER, 2)}`
                              : `-$${toFormatted(wager, 2)}`}
                          </span>
                        </>
                      </FormControl>
                    </FormItem>
                    <FormItem className="mb-0 h-full">
                      <>
                        <FormControl>
                          <RadioGroupPrimitive.Item
                            value={CoinSide.TAILS as unknown as string}
                            className="relative flex h-full w-full items-center justify-center gap-1 text-unity-white-50"
                          >
                            <img
                              src="/images/tokens/wsol.png"
                              width={20}
                              height={20}
                              alt="btc_icon"
                            />
                            BTC
                            <RadioGroupPrimitive.Indicator className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-md bg-gradient-to-t from-unity-coinflip-purple-700 to-unity-coinflip-purple-400 text-zinc-100">
                              <img
                                src="/images/tokens/wsol.png"
                                width={20}
                                height={20}
                                alt="btc_icon"
                              />
                              BTC
                            </RadioGroupPrimitive.Indicator>
                          </RadioGroupPrimitive.Item>
                        </FormControl>
                        <span
                          className={cn(
                            "relative top-2 flex items-center justify-center gap-1 text-zinc-100",
                            {
                              "text-lime-500": field.value === CoinSide.TAILS,
                              "text-red-500": field.value === CoinSide.HEADS,
                            }
                          )}
                        >
                          {field.value === CoinSide.TAILS
                            ? `+$${toFormatted(wager * WIN_MULTIPLIER, 2)}`
                            : `-$${toFormatted(wager, 2)}`}
                        </span>
                      </>
                    </FormItem>
                  </RadioGroupPrimitive.Root>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <BetCountFormField
          isDisabled={form.formState.isSubmitting || form.formState.isLoading}
        />
        <div className="mb-6 grid grid-cols-2 gap-2">
          <div>
            <FormLabel>Max Payout</FormLabel>
            <div
              className={cn(
                "flex w-full items-center gap-1 rounded-lg bg-zinc-800 px-2 py-[10px]"
              )}
            >
              {/* <WagerCurrencyIcon /> */}
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
              <StopGainFormField
                isDisabled={
                  form.formState.isSubmitting || form.formState.isLoading
                }
              />
              <StopLossFormField
                isDisabled={
                  form.formState.isSubmitting || form.formState.isLoading
                }
              />
            </div>
          </Advanced>
        </div>
        {/* <PreBetButton> */}
        <Button
          type="submit"
          variant={"success"}
          className="w-full max-lg:-order-1 max-lg:mb-3.5"
          size={"xl"}
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            form.formState.isLoading
          }
        >
          Bet
        </Button>
        {/* </PreBetButton> */}
      </div>
      <footer className="flex items-center justify-between">
        {/* <AudioController /> */}
      </footer>
    </BetControllerContainer>
  );
};
