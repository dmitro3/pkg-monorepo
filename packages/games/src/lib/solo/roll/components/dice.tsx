import React from "react";
import { useFormContext } from "react-hook-form";
import { DICE } from "../types";
import { DiceForm } from "../constant";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import { cn } from "../../../utils/style";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface Props {
  item: DICE;
  winner: number | undefined;
  isBetting: boolean;
  isDisabled?: boolean;
}

export const dotPosition = {
  0: ["top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform"],
  1: ["top-[16px] left-[16px]", "bottom-[16px] right-[16px]"],
  2: [
    "top-[16px]  left-[16px] ",
    "top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform",
    "bottom-[16px] right-[16px]",
  ],
  3: [
    "top-[16px] left-[16px] ",
    "top-[16px] right-[16px]",
    "bottom-[16px] left-[16px]",
    "bottom-[16px] right-[16px]",
  ],
  4: [
    "top-[16px] left-[16px] ",
    "top-[16px] right-[16px]",
    "top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform",
    "bottom-[16px] left-[16px]",
    "bottom-[16px] right-[16px]",
  ],
  5: [
    "top-[16px] left-[16px] ",
    "top-[16px] right-[16px]",
    "top-1/2 left-[16px] -translate-y-1/2 transform",
    "top-1/2 right-[16px]   -translate-y-1/2 transform",
    "bottom-[16px] left-[16px]",
    "bottom-[16px] right-[16px]",
  ],
};

export const miniDotPosition = {
  0: ["top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform"],
  1: ["top-[4px] left-[4px]", "bottom-[4px] right-[4px]"],
  2: [
    "top-[4px]  left-[4px] ",
    "top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform",
    "bottom-[4px] right-[4px]",
  ],
  3: [
    "top-[4px] left-[4px] ",
    "top-[4px] right-[4px]",
    "bottom-[4px] left-[4px]",
    "bottom-[4px] right-[4px]",
  ],
  4: [
    "top-[4px] left-[4px] ",
    "top-[4px] right-[4px]",
    "top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform",
    "bottom-[4px] left-[4px]",
    "bottom-[4px] right-[4px]",
  ],
  5: [
    "top-[4px] left-[4px] ",
    "top-[4px] right-[4px]",
    "top-1/2 left-[4px] -translate-y-1/2 transform",
    "top-1/2 right-[4px]   -translate-y-1/2 transform",
    "bottom-[4px] left-[4px]",
    "bottom-[4px] right-[4px]",
  ],
};

const Dice: React.FC<Props> = ({
  item,
  winner,
  isBetting = false,
  isDisabled = false,
}) => {
  const form = useFormContext() as DiceForm;

  return (
    <FormField
      key={item}
      control={form.control}
      name="dices"
      render={({ field }) => {
        return (
          <FormItem
            key={item}
            className="mb-0 aspect-square h-full transform-gpu transition-all duration-300 ease-in-out hover:scale-[1.2]"
          >
            <FormControl>
              <CheckboxPrimitive.Root
                className={cn(
                  " focus-visible:ring-ring  data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer relative mb-0 h-full w-full shrink-0 rounded-xl bg-zinc-700    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  {
                    "bg-white": field.value?.includes(item),
                    "bg-green-500":
                      field.value?.includes(item) &&
                      item + 1 === winner &&
                      isBetting,
                    "bg-red-600":
                      !field.value?.includes(item) &&
                      item + 1 === winner &&
                      isBetting,
                  }
                )}
                checked={field.value?.includes(item)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item])
                    : field.onChange(
                        field.value?.filter((value) => value !== item)
                      );
                }}
                style={{
                  boxShadow:
                    "5.778px 5.778px 8.667px 0px rgba(255, 255, 255, 0.30) inset, -5.778px -5.778px 8.667px 0px rgba(0, 0, 0, 0.40) inset",
                }}
                disabled={isDisabled}
              >
                {dotPosition[item].map((dot, i) => (
                  <Dot
                    className={dot}
                    key={i}
                    selected={field.value?.includes(item)}
                  />
                ))}
              </CheckboxPrimitive.Root>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default Dice;

export const Dot = ({
  className,
  selected = false,
}: {
  className?: string;
  selected: boolean;
}) => {
  return (
    <div
      className={cn(
        "ease transfrom  absolute h-4 w-4 shrink-0 rounded-full border-2 border-[#EDEDF1] bg-dice transition-all sm:h-[23px] sm:w-[23px]",
        className,
        { "border-[#41414C] bg-dice-selected": selected }
      )}
    />
  );
};
