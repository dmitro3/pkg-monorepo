"use client";

import { INumberInputContext, NumberInput, cn } from "@winrlabs/ui";
import React from "react";

interface Props extends INumberInputContext {
  children?: React.ReactNode;
  hasError?: boolean;
  className?: string;
  containerClassName?: string;
}

export const StopGainLossInput = ({
  className,
  hasError,
  containerClassName,
  ...rest
}: Props) => {
  return (
    <NumberInput.Root {...rest}>
      <NumberInput.Container
        className={cn(
          "border-none bg-zinc-950 px-2 py-[10px]",
          {
            ["border border-solid border-red-600"]: !!hasError,
          },
          containerClassName
        )}
      >
        <NumberInput.Input
          className={cn(
            "border-none bg-transparent px-0 py-2 text-xl leading-5 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
            className
          )}
        />
      </NumberInput.Container>
    </NumberInput.Root>
  );
};
