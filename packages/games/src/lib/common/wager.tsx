import { INumberInputContext, NumberInput, cn, Button } from "@winrlabs/ui";
import { toFormatted } from "../utils/web3";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

interface WagerInputProps extends Props, INumberInputContext {
  containerClassName?: string;
  hasError?: boolean;
}

export const WagerInput = ({
  className,
  containerClassName,
  hasError,
  ...rest
}: WagerInputProps) => {
  return (
    <NumberInput.Root {...rest}>
      <NumberInput.Container
        className={cn(
          "border-none bg-zinc-950 px-2 py-[10px] text-base font-semibold leading-4",
          {
            ["border border-solid border-red-600"]: !!hasError,
          },
          containerClassName
        )}
      >
        <span className="mt-[1px] text-lg">$</span>
        <NumberInput.Input
          className={cn(
            "z-10 border-none bg-transparent pl-1 text-base leading-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
            className
          )}
        />
        {/* <WagerCurrencyIcon /> */}
      </NumberInput.Container>
    </NumberInput.Root>
  );
};

interface WagerSetterButtonsProps extends Props {
  maxWager: number;
  minWager: number;
  currentWager: number;
  form: any;
  isDisabled?: boolean;
}

export const WagerSetterButtons = ({
  className,
  minWager,
  maxWager,
  currentWager,
  form,
  isDisabled,
}: WagerSetterButtonsProps) => {
  return (
    <div className="flex items-center gap-1 ">
      <Button
        className={cn("w-full font-[500]", className)}
        type="button"
        disabled={isDisabled}
        variant={"secondary"}
        onClick={() => {
          form.setValue("wager", minWager);
        }}
      >
        MIN
      </Button>
      <Button
        className={cn("w-full font-[500]", className)}
        type="button"
        disabled={isDisabled}
        variant={"secondary"}
        onClick={() => {
          const newValue = currentWager / 3;

          if (newValue < minWager) form.setValue("wager", minWager);
          else form.setValue("wager", newValue);
        }}
      >
        1/3
      </Button>
      <Button
        className={cn("w-full font-[500]", className)}
        type="button"
        disabled={isDisabled}
        variant={"secondary"}
        onClick={() => {
          const newValue = currentWager * 2;

          if (newValue > maxWager) form.setValue("wager", maxWager);
          else form.setValue("wager", newValue);
        }}
      >
        2x
      </Button>
      <Button
        className={cn("w-full font-[500]", className)}
        type="button"
        disabled={isDisabled}
        variant={"secondary"}
        onClick={() => {
          form.setValue("wager", maxWager);
        }}
      >
        MAX
      </Button>
    </div>
  );
};

interface TotalWagerProps extends Props {
  betCount: number;
  wager: number;
  containerClassName?: string;
}

export const TotalWager = ({
  className,
  wager,
  betCount,
  containerClassName,
}: TotalWagerProps) => {
  const totalWager = toFormatted(wager * betCount, 2);

  return (
    <div
      className={cn(
        "flex w-full items-center gap-1 rounded-lg bg-zinc-800 px-2 py-[10px]",
        containerClassName
      )}
    >
      {/* <WagerCurrencyIcon /> */}
      <span className={cn("font-semibold text-zinc-100", className)}>
        ${totalWager}
      </span>
    </div>
  );
};
