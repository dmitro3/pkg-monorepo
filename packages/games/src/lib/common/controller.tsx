import { useFormContext } from "react-hook-form";
import {
  cn,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@winrlabs/ui";
import { BetCount } from "./bet-count";
import { BetCountSlider } from "./containers";
import { StopGainLossInput } from "./stop-gain-loss-input";
import { WagerInput, WagerSetterButtons } from "./wager";
import * as React from "react";

interface WagerFormFieldProps {
  minWager: number;
  maxWager: number;
  isDisabled?: boolean;
  className?: string;
}

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const BetControllerTitle: React.FC<Props> = ({
  children,
  className,
}) => {
  return <h1 className={cn("text-lg font-bold", className)}>{children}</h1>;
};

export const BetCountFormField: React.FC<{
  isDisabled?: boolean;
  maxValue?: number;
}> = ({ isDisabled = false, maxValue = 100 }) => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="betCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Multiple Bets (1-{maxValue}) </FormLabel>

            <FormControl>
              <div>
                <BetCount
                  isDisabled={isDisabled}
                  maxValue={maxValue}
                  {...field}
                />
                <BetCountSlider maxValue={maxValue} {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export const StopGainFormField = ({
  inputContainerClassName,
  labelClassName,
  isDisabled = false,
}: {
  inputContainerClassName?: string;
  labelClassName?: string;
  isDisabled?: boolean;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="stopGain"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(labelClassName)}>Stop Gain</FormLabel>

          <FormControl>
            <StopGainLossInput
              {...field}
              isDisabled={isDisabled}
              hasError={!!form.formState.errors.stopGain}
              containerClassName={cn(inputContainerClassName)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const StopLossFormField = ({
  inputContainerClassName,
  labelClassName,
  isDisabled = false,
}: {
  inputContainerClassName?: string;
  labelClassName?: string;
  isDisabled?: boolean;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="stopLoss"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(labelClassName)}>Stop Loss</FormLabel>

          <FormControl>
            <StopGainLossInput
              {...field}
              isDisabled={isDisabled}
              hasError={!!form.formState.errors.stopLoss}
              containerClassName={cn(inputContainerClassName)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const WagerFormField: React.FC<WagerFormFieldProps> = ({
  minWager,
  maxWager,
  isDisabled,
  className,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="wager"
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            Wager
            <div>
              {/* <WagerBalance className="text-zinc-100" /> */}
              {/* <WagerCurrency /> */}
            </div>
          </FormLabel>

          <FormControl>
            <>
              <WagerInput
                {...field}
                hasError={!!form.formState.errors.wager}
                isDisabled={isDisabled}
              />
              <WagerSetterButtons
                isDisabled={isDisabled}
                form={form}
                minWager={minWager}
                maxWager={maxWager}
                currentWager={field.value}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
