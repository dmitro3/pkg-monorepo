import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn, FormControl, FormField, FormItem } from "@winrlabs/ui";
import { useFormContext } from "react-hook-form";
import { RangeForm } from "../constant";

export interface SliderTrackOptions {
  color?: string;
  activeColor?: string;
}

export interface SliderProps {
  isLoading?: boolean;
  disabled?: boolean;
  track?: SliderTrackOptions;
}

const MIN_VALUE = 5;

const MAX_VALUE = 95;

export const Slider = ({ isLoading, disabled, track }: SliderProps) => {
  const form = useFormContext() as RangeForm;

  const rollValue = form.watch("rollValue");

  const rollType = form.watch("rollType");

  return (
    <div className="w-full shrink-0">
      <FormField
        control={form.control}
        name="rollValue"
        render={({ field }) => (
          <FormItem className="mb-0">
            <FormControl>
              <SliderPrimitive.Root
                className={cn(
                  "relative flex h-6 cursor-pointer touch-none select-none items-center",
                  {
                    "cursor-not-allowed": isLoading,
                  }
                )}
                defaultValue={[rollValue]}
                min={MIN_VALUE}
                max={MAX_VALUE}
                onValueChange={(e) => {
                  field.onChange(e[0]);

                  const { rollType } = form.getValues();

                  const newValue = rollType === "UNDER" ? e[0] : 100 - e[0]!;

                  form.setValue("winChance", newValue!, {
                    shouldValidate: true,
                  });
                }}
                step={0.01}
                value={rollValue <= MAX_VALUE ? [rollValue] : [MAX_VALUE]}
                disabled={disabled}
              >
                <SliderPrimitive.Track
                  className={cn(
                    "relative h-6 grow rounded-sm transition-all duration-300 ease-linear"
                  )}
                  style={{
                    background:
                      rollType === "OVER" ? track?.activeColor : track?.color,
                  }}
                >
                  <SliderPrimitive.Range
                    className={cn(
                      "absolute h-full rounded-sm  transition-all duration-300 ease-linear"
                    )}
                    style={{
                      background:
                        rollType === "OVER" ? track?.color : track?.activeColor,
                    }}
                  />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  className="relative  grid h-16 w-16  place-items-center rounded-[10px] bg-gradient-to-b from-white to-[#C5C5CC] shadow-[0_1px_5px] focus:shadow-[0_2px_10px] focus:outline-none focus:ring-0"
                  aria-label="Volume"
                >
                  <div className="absolute -top-[50px] text-4xl font-bold">
                    {rollValue <= MAX_VALUE ? rollValue : MIN_VALUE}
                  </div>
                  <div className="flex gap-[6px]">
                    <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
                    <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
                    <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
                  </div>
                </SliderPrimitive.Thumb>
              </SliderPrimitive.Root>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="mt-[22px] flex justify-between text-[15px] font-bold">
        <span>{MIN_VALUE}</span>
        <span>{MAX_VALUE}</span>
      </div>
    </div>
  );
};
