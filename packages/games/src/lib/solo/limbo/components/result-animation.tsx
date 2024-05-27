import React from "react";
import { cn } from "../../../utils/style";
import useLimboGameStore from "../store";

const ResultAnimation = () => {
  const { lastBets } = useLimboGameStore(["lastBets"]);

  const won = lastBets[lastBets.length - 1]?.payout || 0 > 0 ? true : false;
  return (
    <div
      className={cn(
        "wr-absolute wr-left-0 wr-top-28 wr-h-[600%] wr-w-full  wr-overflow-hidden  wr-transition-all wr-ease-in",
        {
          "wr-opacity-0": lastBets[lastBets.length - 1]?.number === 0,
        }
      )}
    >
      <div className="wr-relative wr-h-full wr-w-full ">
        <div className="wr-absolute wr-bottom-0 wr-left-0 wr-w-full wr-transition-all wr-ease-in">
          <div
            className={cn("wr-relative wr-h-0.5 wr-bg-blue-500", {
              "wr-bg-red-600": won,
              "wr-bg-green-600": won,
            })}
          >
            <div
              className={cn(
                "wr-absolute wr-left-0 wr-top-0 wr-h-[70px] wr-w-full  wr-bg-limbo-result wr-transition-all wr-ease-in",
                { "wr-bg-limbo-win": won, "wr-bg-limbo-loss": !won }
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultAnimation;
