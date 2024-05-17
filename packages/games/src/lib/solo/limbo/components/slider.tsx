import React from "react";
import { useFormContext } from "react-hook-form";
import { LimboForm } from "../types";
import { cn } from "../../../utils/style";
import useDimensions from "react-cool-dimensions";

type ScalePoint = {
  value: number;
  topPercent: number;
};

// Define the points for the scale
const scalePoints: ScalePoint[] = [
  { value: 0, topPercent: -410 },
  { value: 1, topPercent: -390 },
  { value: 2, topPercent: -362 },
  { value: 3, topPercent: -334 },
  { value: 4, topPercent: -306 },
  { value: 5, topPercent: -278 },
  { value: 6, topPercent: -250 },
  { value: 7, topPercent: -222 },
  { value: 8, topPercent: -194 },
  { value: 9, topPercent: -166 },
];

const largerScalePoints: ScalePoint[] = [
  { value: 10, topPercent: -138 },
  { value: 15, topPercent: -110 },
  { value: 20, topPercent: -82 },
  { value: 25, topPercent: -70 },
  { value: 30, topPercent: -60 },
  { value: 35, topPercent: -53 },
  { value: 40, topPercent: -40 },
  { value: 45, topPercent: -32 },
  { value: 50, topPercent: -25 },
  { value: 55, topPercent: -18 },
  { value: 60, topPercent: -10 },
  { value: 65, topPercent: 3 },
  { value: 70, topPercent: 15 },
  { value: 80, topPercent: 31 },
  { value: 90, topPercent: 45 },
  { value: 100, topPercent: 60 },
];

function interpolate(value: number, points: ScalePoint[]): number {
  // Find the two points between which we need to interpolate
  const lowerPoint = points.reduce((prev, curr) =>
    value >= curr.value ? curr : prev
  );

  const upperPoint = points.reduce((prev, curr) =>
    value <= curr.value ? curr : prev
  );

  // Calculate the position of the value between the two points (0 to 1)
  const rangeValue = upperPoint.value - lowerPoint.value;

  const rangePercent = upperPoint.topPercent - lowerPoint.topPercent;

  const valuePosition = (value - lowerPoint.value) / rangeValue;

  // Interpolate the topPercent for the value
  const interpolatedPercent =
    lowerPoint.topPercent + valuePosition * rangePercent;

  console.log("interpolatedPercent", interpolatedPercent);

  return interpolatedPercent;
}

const LimboSlider = ({
  won,
  status,
  result,
}: {
  won: boolean;
  result: number;
  status: "idle" | "playing";
}) => {
  const { observe, width } = useDimensions<HTMLDivElement>({
    onResize: ({ observe, unobserve }) => {
      unobserve();

      observe();
    },
  });

  const form = useFormContext() as LimboForm;

  const limboMultiplier = form.watch("limboMultiplier");

  const showNumber = status === "idle" ? limboMultiplier : result;

  const firstSteps = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const secondSteps = [100, 80, 65, 50, 35, 20, 15];

  const calculatedTopPostion = React.useMemo(() => {
    const topPositionPercent = interpolate(showNumber, scalePoints);

    const topPositionPercentLarger = interpolate(showNumber, largerScalePoints);

    const topPositionPixels = (topPositionPercent / 100) * 85;

    const topPositionPixelsLarger = (topPositionPercentLarger / 100) * 85;

    if (showNumber <= 10) {
      return topPositionPixels;
    } else {
      return topPositionPixelsLarger;
    }
  }, [showNumber]);

  return (
    <div
      className="absolute left-0 top-28 h-[calc(100%_-_64px_-_12px_-_48px)] w-full "
      ref={observe}
    >
      <div className="relative h-full w-full">
        <div
          className={cn(
            "absolute flex h-[400%] w-full flex-col justify-between px-[15px] text-[14px] text-zinc-600 transition-all duration-300 ease-in-out",

            {
              "bg-limbo-win": won && result !== 0,
              "bg-limbo-loss": !won && result !== 0,
            }
          )}
          style={{
            top: `${calculatedTopPostion}%`,
          }}
        >
          {secondSteps.map((step, i) => (
            <>
              <div key={step} className="flex justify-between">
                <div className="flex items-center gap-1.5 leading-[2px]">
                  <div className="h-[1px] w-[40px] bg-zinc-800" />
                  {step.toFixed(2)} x
                </div>
                <div className=" flex items-center gap-1.5 leading-[2px]">
                  {step.toFixed(2)} x
                  <div className="h-[1px] w-[40px] bg-zinc-800" />
                </div>
              </div>

              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
            </>
          ))}
          {firstSteps.map((step, i) => (
            <>
              <div key={step} className="flex justify-between">
                <div className="flex items-center gap-1.5 leading-[2px]">
                  <div className="h-[1px] w-[40px] bg-zinc-800" />
                  {step.toFixed(2)}x
                </div>
                <div className=" flex items-center gap-1.5 leading-[2px]">
                  {step.toFixed(2)}x
                  <div className="h-[1px] w-[40px] bg-zinc-800" />
                </div>
              </div>

              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
              <div className="flex justify-between ">
                <div className=" h-[1px] w-5 bg-zinc-800" />
                <div className=" ml-auto h-[1px] w-5 bg-zinc-800" />
              </div>
            </>
          ))}
        </div>

        <div
          className="absolute top-1/2 h-0.5 w-[1020px] -translate-y-1/2 border border-zinc-700  shadow-[0_1px_5px] focus:shadow-[0_2px_10px] focus:outline-none focus:ring-0"
          aria-label="Volume"
          style={{ width: `${width}px` }}
        >
          <div className="h-[70px] bg-limbo-track"></div>

          <span className="absolute  -top-12  left-1/2 h-[64px] -translate-x-1/2 transform border-none text-[64px] font-bold">
            {showNumber.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  );
};

export default LimboSlider;
