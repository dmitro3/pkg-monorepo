import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@winrlabs/ui";
import useRangeGameStore from "./_store";

export interface SliderTrackOptions {
  color?: string;
  activeColor?: string;
}

export interface SliderProps {
  rollType?: "UNDER" | "OVER";
  isLoading?: boolean;
  rollValue?: number;
  onRollValueChange?: (value: number) => void;
  disabled?: boolean;
  track?: SliderTrackOptions;
}

const MIN_VALUE = 5;

const MAX_VALUE = 95;

export const Slider = ({
  rollType = "UNDER",
  isLoading,
  onRollValueChange,
  disabled,
  track,
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
        defaultValue={[rollValue]}
        min={0}
        max={100}
        onValueChange={(e) => {
          const newValue = rollType === "UNDER" ? e[0] : 100 - e[0]!;

          onRollValueChange?.(newValue!);
          updateRollValue(newValue!);
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
            background: rollType === "OVER" ? track?.activeColor : track?.color,
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
    </div>
  );
};
