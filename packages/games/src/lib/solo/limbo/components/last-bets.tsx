import React from "react";
import useLimboGameStore from "../store";
import { LastBetsContainer } from "../../../common/last-bets-container";
import { cn } from "../../../utils/style";

const LastBets = () => {
  const { lastBets } = useLimboGameStore(["lastBets"]);

  return (
    <LastBetsContainer className="mx-auto pt-3.5">
      {lastBets?.map((result, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex h-7 w-[53px] flex-shrink-0 items-center justify-center rounded-[1000px] bg-zinc-700 font-semibold text-zinc-100",
              {
                "bg-green-500": result.payout > 0,
              }
            )}
          >
            <div className="text-zinc-100">{result.number}</div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};

export default LastBets;
