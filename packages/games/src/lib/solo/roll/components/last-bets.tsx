import { LastBetsContainer } from "../../../common/last-bets-container";
import { cn } from "../../../utils/style";
import { FormLabel } from "../../../ui/form";
import React from "react";
import { miniDotPosition } from "./dice";
import useDiceLastBetStore from "../store";

type DiceResultIndex = 0 | 1 | 2 | 3 | 4 | 5;

export const LastBets = () => {
  const { lastBets } = useDiceLastBetStore(["lastBets"]);

  return (
    <LastBetsContainer className="h-12">
      {lastBets?.map((result, index) => {
        return (
          <div
            className={cn(
              "relative aspect-square h-9 w-9 rounded-md border-2 border-zinc-800 bg-black",
              {
                "bg-green-500": result.payout > 0,
              }
            )}
            key={`dot-${index}`}
          >
            {miniDotPosition?.[(result.dice - 1) as DiceResultIndex]?.map(
              (dot, i) => (
                <div
                  key={i}
                  className={cn(
                    "ease transfrom  absolute h-2 w-2 shrink-0 rounded-full border-2 border-[#EDEDF1] bg-dice transition-all ",
                    dot
                  )}
                />
              )
            )}
          </div>
        );
      })}
    </LastBetsContainer>
  );
};

export const RollController: React.FC<{
  multiplier: number;
  winChance: number;
}> = ({ multiplier, winChance }) => {
  return (
    <section className="z-10 grid w-[280px] grid-cols-2 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-[14px]">
      <div>
        <FormLabel>Multiplier</FormLabel>
        <div className="rounded-md bg-zinc-800 p-3 font-semibold">
          {multiplier}x
        </div>
      </div>
      <div>
        <FormLabel>Win Chance</FormLabel>
        <div className="rounded-md bg-zinc-800 p-3 font-semibold">
          {winChance}%
        </div>
      </div>
    </section>
  );
};
