import { cn } from "../../../utils/style";
import { COIN_SIDE } from "../constants";
import useCoinFlipGameStore from "../store";
import { CoinFlip3dGameResult } from "../types";

const LastBet = ({ result }: { result: CoinFlip3dGameResult }) => {
  return (
    <div
      className={cn(
        "wr-flex wr-h-7 wr-w-[70px] wr-flex-shrink-0 wr-items-center wr-justify-center wr-rounded-[1000px] wr-bg-zinc-700 wr-font-semibold wr-text-zinc-100",
        {
          "wr-bg-green-500": result.payout > 0,
        }
      )}
    >
      {result.coinSide === COIN_SIDE.ETH ? (
        <img
          src="/images/tokens/weth.png"
          width={20}
          height={20}
          alt="eth_icon"
        />
      ) : (
        <img
          src="/images/tokens/wbtc.png"
          width={20}
          height={20}
          alt="btc_icon"
        />
      )}
      <div className="wr-ml-1 wr-text-zinc-100">
        {result.coinSide === COIN_SIDE.ETH ? "ETH" : "BTC"}
      </div>
    </div>
  );
};

export const CoinFlipLastBets: React.FC = () => {
  const { lastBets } = useCoinFlipGameStore(["lastBets"]);

  return (
    <section className="wr-absolute wr-left-1/2 wr-top-5  wr-flex wr-max-w-[350px] -wr-translate-x-1/2 wr-items-center wr-justify-end wr-gap-[6px] wr-overflow-hidden">
      {lastBets?.map((result, index) => {
        return <LastBet result={result} key={index} />;
      })}
    </section>
  );
};
