"use client";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@winrlabs/ui";
import useRangeGameStore from "../store";

export const TextRandomizer = () => {
  const { rangeGameResults, currentAnimationCount } = useRangeGameStore([
    "rangeGameResults",
    "currentAnimationCount",
  ]);

  const currentResult = rangeGameResults[currentAnimationCount];

  const [resetAnimation, setResetAnimation] = React.useState(false);

  React.useEffect(() => {
    if (rangeGameResults.length === 0) {
      return;
    } else {
      setResetAnimation(false);
    }
  }, [rangeGameResults]);

  React.useEffect(() => {
    setResetAnimation(true);

    setTimeout(() => {
      setResetAnimation(false);
    }, 1000);
  }, [rangeGameResults]);

  return (
    <div className="relative w-full">
      <div>
        {currentResult ? (
          <div
            className={cn("transition-all", {
              "opacity-0 delay-1000":
                currentAnimationCount + 1 === rangeGameResults.length,
              "opacity-0": resetAnimation,
              "opacity-100 delay-100": rangeGameResults.length === 1,
            })}
          >
            <span
              className={cn(
                "absolute bottom-6  z-10 -translate-x-1/2 rounded-lg p-2 text-4xl font-bold transition-all",
                {
                  "bg-lime-600": currentResult?.payout > 0,
                  "bg-red-600": currentResult?.payout <= 0,
                }
              )}
              style={{ left: `${currentResult.resultNumber}%` }}
            >
              {currentResult.resultNumber}
            </span>
            <Polygon
              result={currentResult?.payout || 0 > 0 ? "win" : "loss"}
              resultNumber={currentResult.resultNumber}
            />
          </div>
        ) : null}
      </div>

      {/* Dots */}
      {rangeGameResults.map((result, key) => (
        <span
          key={key}
          style={{ left: `${result.resultNumber}%` }}
          className={cn(
            "absolute  bottom-[-40px] h-1.5 w-1.5 -translate-x-1/2 rounded-full opacity-0 transition-all",
            {
              "bg-lime-600": result?.payout > 0,
              "bg-red-600": result?.payout <= 0,
              "opacity-100 transition-all": key <= currentAnimationCount,
              "opacity-0": resetAnimation,
            }
          )}
        >
          <TooltipProvider>
            <Tooltip key={key}>
              <TooltipTrigger>
                <div className="relative  -top-2 block h-1.5  w-1.5 rounded" />
              </TooltipTrigger>
              <TooltipContent className=" absolute top-0 z-[100]">
                <p>{result?.resultNumber}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      ))}
    </div>
  );
};

const Polygon = ({
  result,
  resultNumber,
}: {
  result: "win" | "loss";
  resultNumber?: number;
}) => {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[9px] z-10 -translate-x-1/2 transition-all"
      style={{ left: `${resultNumber}%` }}
    >
      <path
        d="M12.196 13.2864C11.4127 14.5397 9.58734 14.5397 8.804 13.2864L0.500001 -1.58893e-07L20.5 -1.90735e-06L12.196 13.2864Z"
        fill={result === "win" ? "#65A30D" : "#DC2626"}
      />
    </svg>
  );
};
