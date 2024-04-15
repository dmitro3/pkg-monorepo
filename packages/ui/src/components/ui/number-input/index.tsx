"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { cn, toFormatted } from "@/index";
// import { ArrowDown, ArrowUp } from 'src/components/icons';

// min max tool
// label
// input
// placeholder
// tool
// unit
// error

export interface INumberInputContext {
  maxValue?: number;
  minValue?: number;
  isDisabled?: boolean;
  value: number;
  onChange: (input: number) => void;
  errorMessage?: string;
  initialValue?: number;
  setHasError?: (input: boolean) => void;
  hasSlider?: boolean;
  hasExtraField?: boolean;
  sliderStep?: number;
}

const NumberInputContext = React.createContext({} as INumberInputContext);

const useNumberInput = () => {
  const ctx = React.useContext(NumberInputContext);

  return ctx;
};

const ErrorMessage: React.FC<{
  errorMessage: string;
  hasSlider?: boolean;
  hasExtraField?: boolean;
  className?: string;
}> = ({ errorMessage, className }) => {
  const hasErrorMessage = !!errorMessage;

  return (
    <div
      className={cn(
        "mt-1 text-red-600 transition-all motion-safe:ease-in",
        {
          "h-10": hasErrorMessage,
          "h-0": !hasErrorMessage,
        },
        className
      )}
    >
      {errorMessage}
    </div>
  );
};

type RootProps = Pick<
  INumberInputContext,
  | "maxValue"
  | "minValue"
  | "onChange"
  | "initialValue"
  | "isDisabled"
  | "value"
  | "setHasError"
  | "hasSlider"
  | "hasExtraField"
> & {
  className?: string;
  errorClassName?: string;
  hideError?: boolean;
  secondaryValue?: number | string;
  sliderStep?: number;
};

const Root: React.FC<RootProps & { children: React.ReactNode }> = ({
  children,
  maxValue,
  minValue,
  isDisabled,
  onChange,
  initialValue,
  value,
  setHasError,
  className,
  errorClassName,
  hasSlider,
  hasExtraField,
  hideError,
  secondaryValue,
  sliderStep,
}) => {
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (initialValue) onChange(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const _value = value || 0;

    if ((maxValue && _value > maxValue) || (minValue && _value < minValue)) {
      setErrorMessage(
        `Value must be between ${toFormatted(minValue || 0, 5)} and ${
          toFormatted(maxValue || 0, 5) || "∞"
        }`
      );

      setHasError && setHasError(true);
    } else {
      setErrorMessage("");

      setHasError && setHasError(false);
    }
  }, [value, minValue, maxValue]);

  return (
    <NumberInputContext.Provider
      value={{
        value,
        initialValue,
        onChange,
        isDisabled,
        maxValue,
        errorMessage,
        minValue,
        sliderStep,
      }}
    >
      <fieldset className={cn(className)}>
        {children}
        {!hideError && (
          <ErrorMessage
            className={errorClassName}
            hasExtraField={hasExtraField}
            hasSlider={hasSlider}
            errorMessage={errorMessage}
          />
        )}
        {secondaryValue ? (
          <div className={""}>${toFormatted(secondaryValue, 0)}</div>
        ) : (
          ""
        )}
      </fieldset>
    </NumberInputContext.Provider>
  );
};

const Container: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { errorMessage, isDisabled } = useNumberInput();

  return (
    <div
      className={cn(
        "relative flex h-10 w-full items-center rounded-md border border-zinc-800",
        className,
        {
          ["border-red-600"]: !!errorMessage,
          ["pointer-events-none opacity-50"]: isDisabled,
        }
      )}
    >
      {children}
    </div>
  );
};

const Input: React.FC<{
  placeholder?: string;
  decimalScale?: number;
  className: string;
  id?: string;
  prefix?: string;
}> = ({ placeholder, decimalScale = 4, className, id, prefix = "" }) => {
  const { value, onChange, isDisabled } = useNumberInput();

  return (
    <NumericFormat
      placeholder={placeholder}
      value={value}
      decimalScale={decimalScale}
      displayType="input"
      autoComplete="off"
      onValueChange={(valueObj) => {
        console.log("valueObj", valueObj);

        onChange(valueObj.floatValue || 0);
      }}
      allowNegative={false}
      disabled={isDisabled}
      id={id}
      thousandSeparator=","
      prefix={prefix}
      className={cn(
        "h-full w-full rounded-md  border-none bg-transparent p-0 py-2  outline-none",
        className
      )}
    />
  );
};

const NumberInput = {
  Root,
  Container,
  Input,
};

export { NumberInput };
