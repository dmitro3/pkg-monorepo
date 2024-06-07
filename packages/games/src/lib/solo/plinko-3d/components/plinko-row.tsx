import React from "react";
import { useFormContext } from "react-hook-form";
import * as Slider from "@radix-ui/react-slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { NumberInput } from "../../../ui/number-input";
import { cn } from "../../../utils/style";

const PlinkoRow = () => {
  const form = useFormContext() as PlinkoForm;

  return (
    <FormField
      control={form.control}
      name="plinkoSize"
      render={({ field }) => (
        <FormItem className="mt-3">
          <FormLabel className="text-unity-white-50">Plinko Row</FormLabel>

          <FormControl>
            <>
              <NumberInput.Root minValue={6} maxValue={12} {...field}>
                <NumberInput.Container
                  className={cn(
                    "relative border border-solid  border-unity-white-15 bg-unity-white-15 px-2 py-[10px] backdrop-blur-md "
                  )}
                >
                  <NumberInput.Input className={cn()} />

                  <Slider.Root
                    className={cn(
                      "absolute bottom-0 left-0 -mt-8 flex w-full touch-none select-none items-center px-1.5"
                    )}
                    min={6}
                    value={[form.getValues("plinkoSize")]}
                    max={12}
                    onValueChange={(e) => {
                      form.setValue("plinkoSize", e[0], {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <Slider.Track className="relative h-1 w-full grow cursor-pointer overflow-hidden rounded-full  bg-zinc-600">
                      <Slider.Range className="absolute h-full bg-sky-400" />
                    </Slider.Track>
                    <Slider.Thumb className="border-primary ring-offset-background focus-visible:ring-ring flex  h-4 w-4 cursor-pointer items-center justify-center rounded-full border-2 bg-white text-[12px] font-medium text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                  </Slider.Root>
                </NumberInput.Container>
              </NumberInput.Root>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlinkoRow;
