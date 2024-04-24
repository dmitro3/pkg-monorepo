"use client";

import { INumberInputContext, NumberInput } from "@winrlabs/ui";
import { cn } from "@winrlabs/ui";

interface Props extends INumberInputContext {
  className?: string;
  hasError?: boolean;
  containerClassName?: string;
}

export const BetCount = ({
  className,
  hasError,
  containerClassName,
  ...rest
}: Props) => {
  return (
    <NumberInput.Root {...rest}>
      <NumberInput.Container
        className={cn(
          " rounded-b-[6px] border-none bg-zinc-950 px-2  py-[10px]",
          {
            ["border border-solid border-red-600"]: !!hasError,
          },
          containerClassName
        )}
      >
        <NumberInput.Input
          className={cn(
            "rounded-none border-none  bg-transparent px-0 py-2 text-base font-semibold leading-5 text-white outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
            className
          )}
        />
      </NumberInput.Container>
    </NumberInput.Root>
  );
};
