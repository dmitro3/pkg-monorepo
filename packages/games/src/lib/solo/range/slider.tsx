import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@winrlabs/ui";
import useRangeGameStore from "./_store";

export interface SliderProps {
  rollType?: "UNDER" | "OVER";
  isLoading?: boolean;
  rollValue?: number;
  minValue?: number;
  maxValue?: number;
  onRollValueChange?: (value: number) => void;
  disabled?: boolean;
}

const Slider = ({
  rollType = "UNDER",
  isLoading,
  onRollValueChange,
  minValue = 5,
  maxValue = 95,
  disabled,
}: SliderProps) => {
  const { updateRollValue, rollValue } = useRangeGameStore([
    "updateRollValue",
    "rollValue",
  ]);

  return (
    <div className="w-full shrink-0">
      <SliderPrimitive.Root
        className={cn(
          "relative flex h-6 cursor-pointer touch-none select-none items-center",
          {
            "cursor-not-allowed": isLoading,
          }
        )}
        defaultValue={[20]}
        min={0}
        max={100}
        onValueChange={(e) => {
          const newValue = rollType === "UNDER" ? e[0] : 100 - e[0]!;

          onRollValueChange?.(newValue!);
          updateRollValue(newValue!);
        }}
        step={0.01}
        value={rollValue <= minValue ? [rollValue] : [maxValue]}
        disabled={disabled}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative h-6 grow rounded-sm bg-zinc-400 transition-all duration-300 ease-linear",
            {
              "bg-lime-600": rollType === "OVER",
            }
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              "absolute h-full rounded-sm  bg-lime-600 transition-all duration-300 ease-linear",
              {
                "bg-zinc-400": rollType === "OVER",
              }
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="relative  grid h-16 w-16  place-items-center rounded-[10px] bg-gradient-to-b from-white to-[#C5C5CC] shadow-[0_1px_5px] focus:shadow-[0_2px_10px] focus:outline-none focus:ring-0"
          aria-label="Volume"
        >
          <div className="absolute -top-[50px] text-4xl font-bold">
            {rollValue <= maxValue ? rollValue : minValue}
          </div>
          <div className="flex gap-[6px]">
            <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
            <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
            <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
};

export default Slider;
