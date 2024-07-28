import * as React from "react";

import { ToastTimer } from "../../ui/toast";
import { cn } from "../../utils/style";
import { toDecimals } from "../../utils/web3";

interface NotificationWrapperProps {
  children: React.ReactNode;
  payout: number;
  won: boolean;
  order: number;
  duration: number;
  tokenImage: string;
  playedGameCount: number;
}

export const DefaultNotificationWrapper: React.FC<NotificationWrapperProps> = ({
  won,
  children,
  order,
  payout,
  duration,
  tokenImage,
  playedGameCount,
}) => {
  const currentPayout = won
    ? `+$${toDecimals(payout, 2)}`
    : `-$${toDecimals(Number(10) - payout, 2)}`;
  //liveResult?.result?.wagerInUsd

  return (
    <div
      className={cn("relative w-full rounded-md bg-zinc-900 font-semibold", {
        "bg-lime-800": won,
      })}
    >
      <div className="flex items-center justify-between p-[14px]">
        <div className="flex items-center gap-2">
          <span>
            {order}/{playedGameCount}
          </span>
          {children}
        </div>
        <div
          className={cn("flex items-center", {
            "text-red-600": won === false,
          })}
        >
          {currentPayout}
          {/* {tokenImage && ( */}
          <img
            src={"/tokens/weth.png"}
            width={20}
            height={20}
            alt="token_icon"
            className="ml-1"
          />
          {/* )} */}
        </div>
      </div>
      <ToastTimer
        duration={duration}
        className={cn(
          "absolute bottom-0 w-full rounded-md [&>div]:w-0 [&>div]:animate-timer-progress"
        )}
        thumbClassName={cn("h-[6px] bg-zinc-600", {
          "bg-green-500": won,
        })}
      />
    </div>
  );
};
