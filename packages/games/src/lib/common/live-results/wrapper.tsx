import { useGameOptions } from "../../game-provider";
import { ToastTimer } from "../../ui/toast";
import { cn } from "../../utils/style";
import { toDecimals } from "../../utils/web3";

interface NotificationWrapperProps {
  children: React.ReactNode;
  payout: number;
  won: boolean;
  order: number;
  duration: number;
  playedGameCount: number;
  wagerInUsd: number;
}

export const DefaultNotificationWrapper: React.FC<NotificationWrapperProps> = ({
  won,
  children,
  order,
  payout,
  duration,
  playedGameCount,
  wagerInUsd,
}) => {
  const { currency } = useGameOptions();
  const currentPayout = won
    ? `+$${toDecimals(payout, 2)}`
    : `-$${toDecimals(Number(wagerInUsd) - payout, 2)}`;

  return (
    <div
      className={cn(
        "wr-relative wr-w-full wr-rounded-md wr-bg-zinc-900 wr-font-semibold",
        {
          "wr-bg-lime-800": won,
        }
      )}
    >
      <div className="wr-flex wr-items-center wr-justify-between wr-p-[14px]">
        <div className="wr-flex wr-items-center wr-gap-2">
          <span>
            {order}/{playedGameCount}
          </span>
          {children}
        </div>
        <div
          className={cn("wr-flex wr-items-center wr-gap-1", {
            "wr-text-red-600": won === false,
          })}
        >
          {currentPayout}
          {currency.icon && (
            <img
              src={currency.icon}
              width={20}
              height={20}
              alt="token_icon"
              className="ml-1"
            />
          )}
        </div>
      </div>
      <ToastTimer
        duration={duration}
        className={cn(
          "wr-absolute wr-bottom-0 wr-w-full wr-rounded-md [&>div]:wr-w-0 [&>div]:wr-animate-timer-progress"
        )}
        thumbClassName={cn("wr-h-[6px] wr-bg-zinc-600", {
          "wr-bg-green-500": won,
        })}
      />
    </div>
  );
};
