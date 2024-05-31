import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import { cn } from "../../../utils/style";
import { COIN_SIDE } from "../constants";
import { CoinFlipForm } from "../types";

export const CoinFlipController = () => {
  const form = useFormContext() as CoinFlipForm;

  return (
    <div className="flex items-center lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2">
      <FormField
        control={form.control}
        name="coinSide"
        render={({ field }) => (
          <FormItem className="mb-0 h-10 max-lg:w-full">
            <FormControl>
              <RadioGroupPrimitive.Root
                onValueChange={field.onChange}
                className="grid h-full w-full grid-cols-2 items-center justify-center gap-0 rounded-md bg-unity-white-15 font-semibold lg:w-[412px]"
                defaultValue={field.value}
              >
                <FormItem className="mb-0 h-full text-center">
                  <FormControl>
                    <>
                      <RadioGroupPrimitive.Item
                        value={COIN_SIDE.ETH}
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
                          "relative flex items-center justify-center gap-1 text-zinc-100 max-md:top-2",
                          {
                            "text-green-500": field.value === COIN_SIDE.ETH,
                          }
                        )}
                      >
                        {field.value === COIN_SIDE.ETH ? "+0.95" : "1"}
                        <img
                          alt="usdc_icon"
                          src={"/images/tokens/usdc.png"}
                          width={20}
                          height={20}
                        />
                      </span>
                    </>
                  </FormControl>
                </FormItem>
                <FormItem className="mb-0 h-full">
                  <>
                    <FormControl>
                      <RadioGroupPrimitive.Item
                        value={COIN_SIDE.BTC}
                        className="relative flex h-full w-full items-center justify-center gap-1 text-unity-white-50"
                      >
                        <img
                          src="/images/tokens/wbtc.png"
                          width={20}
                          height={20}
                          alt="btc_icon"
                        />
                        BTC
                        <RadioGroupPrimitive.Indicator className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-md bg-gradient-to-t from-unity-coinflip-purple-700 to-unity-coinflip-purple-400 text-zinc-100">
                          <img
                            src="/images/tokens/wbtc.png"
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
                        "relative flex items-center justify-center gap-1 text-zinc-100 max-md:top-2",
                        {
                          "text-green-500": field.value === COIN_SIDE.BTC,
                        }
                      )}
                    >
                      {field.value === COIN_SIDE.BTC ? "+0.95" : "1"}
                      <img
                        alt="usdc_icon"
                        src={"/images/tokens/usdc.png"}
                        width={20}
                        height={20}
                      />
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
