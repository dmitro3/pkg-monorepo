import { cn } from "@winrlabs/ui";
import { useRangeGameStore } from "..";
import { LastBetsContainer } from "../../../common/last-bets-container";

export const RangeLastBets: React.FC = () => {
  const { lastBets } = useRangeGameStore(["lastBets"]);

  return (
    <LastBetsContainer>
      {lastBets?.map((result, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex h-7 w-[53px] flex-shrink-0 items-center justify-center rounded-[1000px] bg-zinc-700 font-semibold text-zinc-100",
              {
                "bg-lime-500": result.payout > 0,
              }
            )}
          >
            <div className="text-zinc-100">{result.resultNumber}</div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};
