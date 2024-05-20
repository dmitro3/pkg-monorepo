import React from "react";
import { cn } from "../../../utils/style";
import useLimboGameStore from "../store";

const ResultAnimation = () => {
  const { limboGameResults } = useLimboGameStore(["limboGameResults"]);

  const won =
    limboGameResults[limboGameResults.length - 1]?.payout || 0 > 0
      ? true
      : false;
  return (
    <div
      className={cn(
        "absolute left-0 top-28 h-[600%] w-full  overflow-hidden  transition-all ease-in",
        {
          "opacity-0":
            limboGameResults[limboGameResults.length - 1]?.number === 0,
        }
      )}
    >
      <div className="relative h-full w-full ">
        <div className="  absolute bottom-0 left-0 w-full transition-all ease-in">
          <div
            className={cn("relative h-0.5 bg-blue-500", {
              "bg-red-600": won,
              "bg-green-600": won,
            })}
          >
            <div
              className={cn(
                "absolute left-0 top-0 h-[70px] w-full  bg-limbo-result transition-all ease-in",
                { "bg-limbo-win": won, "bg-limbo-loss": !won }
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultAnimation;
