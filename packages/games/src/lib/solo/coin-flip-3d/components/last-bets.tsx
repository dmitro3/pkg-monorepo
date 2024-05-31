import { cn } from "../../../utils/style";
import { COIN_SIDE } from "../constants";
import useCoinFlipGameStore from "../store";
import { CoinFlipGameResult } from "../types";

const LastBet = ({ result }: { result: CoinFlipGameResult }) => {
  return (
    <div
      className={cn(
        "flex h-7 w-[70px] flex-shrink-0 items-center justify-center rounded-[1000px] bg-zinc-700 font-semibold text-zinc-100",
        {
          "bg-green-500": result.payout > 0,
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
      <div className="ml-1 text-zinc-100">
        {result.coinSide === COIN_SIDE.ETH ? "ETH" : "BTC"}
      </div>
    </div>
  );
};

export const CoinFlipLastBets: React.FC = () => {
  const { lastBets } = useCoinFlipGameStore(["lastBets"]);

  return (
    <section className="absolute left-1/2 top-5  flex max-w-[350px] -translate-x-1/2 items-center justify-end gap-[6px] overflow-hidden">
      {lastBets?.map((result, index) => {
        return <LastBet result={result} key={index} />;
      })}
    </section>
  );
};
