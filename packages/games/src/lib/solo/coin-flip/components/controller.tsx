import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  cn,
  toFormatted,
} from "@winrlabs/ui";
import { CoinSide, WIN_MULTIPLIER } from "../constants";
import { useFormContext } from "react-hook-form";
import { CoinFlipForm } from "../types";

export const CoinFlipController = () => {
  const form = useFormContext() as CoinFlipForm;

  const wager = form.watch("wager");

  return (
    <div className="flex items-center lg:absolute lg:bottom-16 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-[350px]">
      <FormField
        control={form.control}
        name="coinSide"
        render={({ field }) => (
          <FormItem className="mb-0 h-12 w-full">
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
                          src="/images/tokens/eth.png"
                          width={20}
                          height={20}
                          alt="eth_icon"
                        />
                        ETH
                        <RadioGroupPrimitive.Indicator className="absolute left-0 top-0 flex h-12 w-full items-center justify-center gap-1 rounded-md bg-gradient-to-t bg-green-500 text-zinc-100">
                          <img
                            src="/images/tokens/eth.png"
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
                          src="/images/tokens/.png"
                          width={20}
                          height={20}
                          alt="btc_icon"
                        />
                        BTC
                        <RadioGroupPrimitive.Indicator className="h-12 absolute left-0 top-0 flex w-full items-center justify-center gap-1 rounded-md bg-gradient-to-t bg-green-500 text-zinc-100">
                          <img
                            src="/images/tokens/.png"
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
  );
};
