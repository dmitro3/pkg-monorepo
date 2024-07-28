import React from "react";

import { IconChevronDown } from "../../svgs";
import { Button } from "../../ui/button";
import { CardContent, CardFooter } from "../../ui/card";
import { ToastPrimitives } from "../../ui/toast";
import { cn } from "../../utils/style";
import useGameNotifications from "./store";
import { DefaultNotificationWrapper } from "./wrapper";

// TODO: add to the provider as a config
const skippableGames = ["dice", "rps", "roulette", "range", "limbo"];

const Result = () => {
  const {
    playedNotifications,
    isFinished,
    resultSummary,
    updateIsSkipped,
    clearPlayedNotifications,
    clearResultSummary,
  } = useGameNotifications([
    "playedNotifications",
    "clearPlayedNotifications",
    "clearResultSummary",
    "resultSummary",
    "isSkipped",
    "updateIsSkipped",
    "isFinished",
    "skipNotifications",
  ]);
  // const isSkippable = skippableGames.includes(resultSummary.game);

  const {
    currentOrder,
    currentProfit,
    lossCount,
    wonCount,
    currency,
    playedGameCount,
    wagerWithMultiplier,
  } = resultSummary;

  return (
    <>
      <CardContent>
        <div
          className={cn(
            "wr-pointer-events-none wr-grid wr-h-min wr-w-full wr-grid-cols-1 wr-items-end wr-space-y-2 wr-transition-all"
          )}
        >
          <ToastPrimitives.Provider swipeDirection="right">
            {playedGameCount !== 0 &&
              playedNotifications.length > 0 &&
              playedNotifications.map(
                (notification, idx) =>
                  notification.component && (
                    <ToastPrimitives.Root
                      className="wr-group wr-pointer-events-none wr-relative wr-my-auto wr-mb-[8px] wr-flex wr-w-full wr-items-center wr-justify-between wr-overflow-hidden wr-rounded-md wr-p-0 wr-shadow-lg wr-transition-all data-[swipe=cancel]:wr-translate-x-0 data-[swipe=end]:wr-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:wr-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:wr-transition-none data-[state=open]:wr-animate-in data-[state=closed]:wr-animate-out data-[swipe=end]:wr-animate-out data-[state=closed]:wr-fade-out-80 data-[state=closed]:wr-slide-out-to-right-full data-[state=open]:wr-slide-in-from-top-full data-[state=open]:wr-sm:slide-in-from-bottom-full"
                      key={notification.order}
                      duration={notification.duration || 4700}
                    >
                      <DefaultNotificationWrapper
                        order={notification.order}
                        payout={notification.payoutInUsd || 0}
                        won={notification.won || false}
                        duration={notification.duration || 5000}
                        tokenImage={"/tokens/weth.png"}
                        playedGameCount={playedGameCount || 0}
                      >
                        {notification.component}
                      </DefaultNotificationWrapper>
                    </ToastPrimitives.Root>
                  )
              )}

            <ToastPrimitives.Viewport className="w-full" />
          </ToastPrimitives.Provider>
        </div>
        <div className="wr-rounded-md wr-border wr-border-zinc-800 wr-p-[14px]">
          <p className="wr-mb-[14px] wr-font-bold">Live Stats</p>
          <ul className="wr-space-y-3">
            {/* <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Bets</span>
              {currentOrder}/{playedGameCount || 0}
            </li> */}
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Wins</span>
              {wonCount}
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Losses</span>
              {lossCount}
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Wager</span>
              0
            </li>
            <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">Profit</span>
              <div className="wr-flex wr-items-center wr-gap-1">
                {currentProfit > 0 ? (
                  <span className="wr-text-green-500">+${currentProfit}</span>
                ) : currentProfit === 0 ? (
                  <span className="wr-text-zinc-100">$0</span>
                ) : (
                  <span className="wr-text-red-500">-${currentProfit * -1}</span>
                )}
                {/* {"d" && ( */}
                <img
                  alt="token_image"
                  src={`${"/tokens/weth.png"}`}
                  width={16}
                  height={16}
                />
                {/* )} */}
              </div>
            </li>
        
       
            {/* <li className="wr-flex wr-items-center wr-justify-between">
              <span className="wr-text-zinc-500">vWINR Rewards</span>
              {false ? (
                <Spinner />
              ) : (
                <div className="wr-flex wr-items-center wr-gap-1 wr-text-green-500">
                   {toDecimals(
                    toDecimals(formatEther(data?.result || BigInt(0)), 2) *
                      lastPriceFeed["WINR"],
                    2
                  )} 
                  format ether $
                </div>
              )}
            </li> */}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="wr-gap-2">
        <Button
          variant={"secondary"}
          className="wr-w-full"
          size={"lg"}
          disabled={true}
        >
          Share(coming soon)
        </Button>
        {false && (
          <Button
            variant={"default"}
            className="wr-relative wr-h-10 wr-w-10 wr-flex-shrink-0 wr-rounded-[100%] wr-p-0"
            onClick={() => {
              updateIsSkipped(true);
            }}
            disabled={isFinished}
          >
            <IconChevronDown className="wr-absolute wr-left-[15px] wr-h-4 wr-w-4 wr--rotate-90" />
            <IconChevronDown className="wr-absolute wr-left-[10px] wr-h-4 wr-w-4 wr--rotate-90" />
          </Button>
        )}
      </CardFooter>
    </>
  );
};

export default Result;
