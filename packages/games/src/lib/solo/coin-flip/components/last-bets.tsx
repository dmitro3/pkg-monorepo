import { cn } from "@winrlabs/ui";
import { CoinFlipGameResult, CoinSide, useCoinFlipGameStore } from "..";
import { CDN_URL } from "../../../constants";

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
      {result.coinSide === CoinSide.HEADS ? (
        <img
          src={`${CDN_URL}/coin-flip-2d/eth.png`}
          width={20}
          height={20}
          alt="eth_icon"
        />
      ) : (
        <img
          src={`${CDN_URL}/coin-flip-2d/btc.png`}
          width={20}
          height={20}
          alt="sol_icon"
        />
      )}
      <div className="ml-1 text-zinc-100">
        {result.coinSide === CoinSide.HEADS ? "ETH" : "BTC"}
      </div>
    </div>
  );
};

export const CoinFlipLastBets: React.FC = () => {
  const { lastBets } = useCoinFlipGameStore(["lastBets"]);

  return (
    <section className="absolute left-1/2 top-5  flex max-w-[375px] -translate-x-1/2 items-center justify-end gap-[6px] overflow-hidden">
      {lastBets?.map((result, index) => {
        return <LastBet result={result} key={index} />;
      })}
    </section>
  );
};
