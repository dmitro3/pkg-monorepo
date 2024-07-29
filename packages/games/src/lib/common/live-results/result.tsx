import { useGameOptions } from "../../game-provider";
import { CardContent } from "../../ui/card";
import { useLiveResultStore } from "./store";

const Result = () => {
  const { currency } = useGameOptions();
  const { currentProfit, lossCount, wonCount, wager } = useLiveResultStore([
    "currentProfit",
    "wonCount",
    "lossCount",
    "wager",
  ]);

  return (
    <>
      <CardContent>
        <div className="wr-rounded-md wr-border wr-border-zinc-800 wr-p-[14px]">
          <p className="wr-mb-[14px] wr-font-bold">Live Stats</p>
          <ul className="wr-space-y-3">
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Wins</span>
              {wonCount}
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Losses</span>
              {lossCount}
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Wager</span>${wager}
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Profit</span>
              <div className="wr-flex wr-items-center wr-gap-1 wr-font-semibold">
                {currentProfit > 0 ? (
                  <span className="wr-text-green-500">+${currentProfit}</span>
                ) : currentProfit === 0 ? (
                  <span className="wr-text-zinc-100">$0</span>
                ) : (
                  <span className="wr-text-red-500">
                    -${currentProfit * -1}
                  </span>
                )}
                <img
                  alt="token_image"
                  src={currency.icon}
                  width={16}
                  height={16}
                />
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </>
  );
};

export default Result;
