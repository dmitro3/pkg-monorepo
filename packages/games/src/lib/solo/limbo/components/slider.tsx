import React from "react";
import { useFormContext } from "react-hook-form";
import { LimboForm } from "../types";
import { cn } from "../../../utils/style";
import useDimensions from "react-cool-dimensions";
import useLimboGameStore from "../store";

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

const LimboSlider = () => {
  const { gameStatus, lastBets } = useLimboGameStore([
    "gameStatus",
    "lastBets",
  ]);

  const won = lastBets[lastBets.length - 1]?.payout || 0 > 0 ? true : false;

  const result = lastBets[lastBets.length - 1]?.number || 0;

  const { observe, width } = useDimensions<HTMLDivElement>({
    onResize: ({ observe, unobserve }) => {
      unobserve();

      observe();
    },
  });

  const form = useFormContext() as LimboForm;

  const limboMultiplier = form.watch("limboMultiplier");

  const showNumber = gameStatus === "IDLE" ? limboMultiplier : result;

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
      className="wr-absolute wr-left-0 wr-top-28 wr-h-[calc(100%_-_64px_-_12px_-_48px)] wr-w-full "
      ref={observe}
    >
      <div className="wr-relative wr-h-full wr-w-full">
        <div
          className={cn(
            "wr-absolute wr-flex wr-h-[400%] wr-w-full wr-flex-col wr-justify-between wr-px-[15px] wr-text-[14px] wr-text-zinc-600 wr-transition-all wr-duration-300 wr-ease-in-out",

            {
              "wr-bg-limbo-win": won && result !== 0,
              "wr-bg-limbo-loss": !won && result !== 0,
            }
          )}
          style={{
            top: `${calculatedTopPostion}%`,
          }}
        >
          {secondSteps.map((step, i) => (
            <>
              <div key={step} className="wr-flex wr-justify-between">
                <div className="wr-flex wr-items-center wr-gap-1.5 wr-leading-[2px]">
                  <div className="wr-h-[1px] wr-w-[40px] wr-bg-zinc-800" />
                  {step.toFixed(2)} x
                </div>
                <div className="wr-flex wr-items-center wr-gap-1.5 wr-leading-[2px]">
                  {step.toFixed(2)} x
                  <div className="wr-h-[1px] wr-w-[40px] wr-bg-zinc-800" />
                </div>
              </div>

              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
            </>
          ))}
          {firstSteps.map((step, i) => (
            <>
              <div key={step} className="wr-flex wr-justify-between">
                <div className="wr-flex wr-items-center wr-gap-1.5 wr-leading-[2px]">
                  <div className="wr-h-[1px] wr-w-[40px] wr-bg-zinc-800" />
                  {step.toFixed(2)}x
                </div>
                <div className=" wr-flex wr-items-center wr-gap-1.5 wr-leading-[2px]">
                  {step.toFixed(2)}x
                  <div className="wr-h-[1px] wr-w-[40px] wr-bg-zinc-800" />
                </div>
              </div>

              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
              <div className="wr-flex wr-justify-between ">
                <div className=" wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
                <div className=" wr-ml-auto wr-h-[1px] wr-w-5 wr-bg-zinc-800" />
              </div>
            </>
          ))}
        </div>

        <div
          className="wr-absolute wr-top-1/2 wr-h-0.5 wr-w-[1020px] -wr-translate-y-1/2 wr-border wr-border-zinc-700  wr-shadow-[0_1px_5px] focus:wr-shadow-[0_2px_10px] focus:wr-outline-none focus:wr-ring-0"
          aria-label="Volume"
          style={{ width: `${width}px` }}
        >
          <div className="wr-h-[70px] wr-bg-limbo-track"></div>

          <span className="wr-absolute  -wr-top-12  wr-left-1/2 wr-h-[64px] -wr-translate-x-1/2 wr-transform wr-border-none wr-text-[64px] wr-font-bold">
            {showNumber.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  );
};

export default LimboSlider;
