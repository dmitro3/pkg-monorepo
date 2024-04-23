"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { toFormatted, cn } from "@/lib/utils";
// import { ArrowDown, ArrowUp } from 'src/components/icons';
// import { TokenAddress, getTokenDisplayDecimal } from "@winrlabs/chain-config";
import { ChevronDown } from "../../svgs";
import * as Slider from "@radix-ui/react-slider";

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

const LabelText: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => {
  return <p className={cn("mb-3 text-zinc-500", className)}>{children}</p>;
};

const LabelBalance: React.FC<{
  balance: number;
  // unit: TokenAddress;
  unit: any;
  className?: string;
}> = ({ balance, unit, className }) => {
  const { onChange, maxValue } = useNumberInput();

  return (
    <div
      className={cn(className)}
      onClick={() => {
        if (maxValue) {
          maxValue > balance ? onChange(balance) : onChange(maxValue);
        }
      }}
    >
      <span>
        {/* {toFormatted(balance, getTokenDisplayDecimal({ token: unit }))} */}
      </span>
      {unit}
    </div>
  );
};

const Label: React.FC<{
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ htmlFor, children, className }) => {
  return (
    <label className={cn(className)} htmlFor={htmlFor}>
      {children}
    </label>
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

const Tools: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={""}>{children}</div>;
};

const InputUnit: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={
        "absolute left-2 top-1/2 mr-1 flex h-5 w-5 -translate-y-1/2 items-center justify-center"
      }
    >
      {children}
    </div>
  );
};

const AdjustValue: React.FC = () => {
  const { onChange, value, minValue, maxValue } = useNumberInput();

  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const [action, setAction] = React.useState<
    "increase" | "decrease" | undefined
  >();

  const [step, setStep] = React.useState(0.001);

  const handleArrows = ({
    step,
    type,
  }: {
    step: number;
    type: "increase" | "decrease";
  }) => {
    const _value = value || 0;

    const _maxValue = maxValue || 10000000000000;

    const _minValue = minValue || 0;

    if (type === "increase") {
      if (_value + step > _maxValue) return;

      onChange(_value + step);
    } else {
      if (_value - step < _minValue) return;
      else onChange(_value - step);
    }
  };

  React.useEffect(() => {
    if (!action || !isMouseDown) return;

    setTimeout(() => {
      setStep(0.01);
    }, 1000);

    const valueTimeout = setTimeout(() => {
      handleArrows({ step, type: action });
    }, 100);

    return () => {
      clearTimeout(valueTimeout);
    };
  }, [value, isMouseDown, handleArrows, action]);

  const clearState = () => {
    setIsMouseDown(false);

    setAction(undefined);

    setStep(0.001);
  };

  return (
    <div className={""}>
      <ChevronDown
        onClick={() => {
          handleArrows({ step, type: "increase" });
        }}
        onMouseDown={() => {
          setAction("increase");

          setIsMouseDown(true);
        }}
        onMouseUp={clearState}
        onMouseLeave={clearState}
        onMouseOut={clearState}
        className="h-5 w-5"
      />
      <ChevronDown
        onClick={() => {
          handleArrows({ step, type: "decrease" });
        }}
        onMouseDown={() => {
          setAction("decrease");

          setIsMouseDown(true);
        }}
        onMouseUp={clearState}
        onMouseLeave={clearState}
        onMouseOut={clearState}
        className="h-5 w-5"
      />
    </div>
  );
};

const ToolsNameSpace = Object.assign(Tools, {
  Unit: InputUnit,
  AdjustValue,
});

const LabelNameSpace = Object.assign(Label, {
  Text: LabelText,
  Balance: LabelBalance,
});

const SliderInput: React.FC = () => {
  const {
    isDisabled,
    minValue: min,
    maxValue: max,
    value,
    onChange,
    sliderStep,
  } = useNumberInput();

  const handleChange = (_value: number[]) => {
    if (typeof min !== "undefined" && min > _value[0]) {
      _value[0] = min;
    }

    if (typeof max !== "undefined" && _value[0] > max) {
      _value[0] = max;
    }

    onChange(_value[0]);
  };

  return (
    <Slider.Root
      className="relative mx-auto my-3 flex h-[5px] w-[100%] cursor-pointer touch-none select-none items-center"
      defaultValue={[value]}
      value={[value]}
      min={min}
      max={max}
      step={sliderStep}
      onValueChange={handleChange}
      minStepsBetweenThumbs={4}
      disabled={isDisabled}
    >
      <Slider.Track className="relative h-full w-full rounded-lg bg-zinc-800">
        <Slider.Range className="absolute h-full rounded-lg bg-red-500" />
      </Slider.Track>
      <Slider.Thumb
        className="block h-[18px] w-[18px] cursor-pointer rounded-full bg-red-500 outline-none"
        aria-label="Volume"
      />
    </Slider.Root>
  );
};

const NumberInput = {
  Root,
  Label: LabelNameSpace,
  Input,
  Container,
  Unit: InputUnit,
  Tools: ToolsNameSpace,
  Slider: SliderInput,
};

export { NumberInput };
