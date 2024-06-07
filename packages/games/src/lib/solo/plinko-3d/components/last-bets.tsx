import { LastBetsContainer } from "../../../common/last-bets-container";

export const Plinko3dLastBets = () => {
  const { lastBets } = usePlinkoLastBetsStore(["lastBets"]);

  return (
    <LastBetsContainer
      className="absolute right-5 top-5 flex-col"
      dir="vertical"
    >
      {lastBets?.map((result, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex h-7 w-[53px] flex-shrink-0 items-center justify-center rounded-[1000px] bg-zinc-700 font-semibold text-zinc-100",
              {
                "bg-green-500": Number(result.multiplier) > 1,
                "bg-sky-500":
                  Number(result.multiplier) > 0.4 &&
                  Number(result.multiplier) < 1,
                "bg-pink-500": Number(result.multiplier) === 0.4,
              }
            )}
          >
            <div className="text-zinc-100">X{result.multiplier}</div>
          </div>
        );
      })}
    </LastBetsContainer>
  );
};
