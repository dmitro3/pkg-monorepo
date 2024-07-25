import React from "react";

import { Button } from "../../ui/button";
import { CardContent, CardFooter } from "../../ui/card";
import { cn } from "../../utils/style";

const Result = () => {
  return (
    <>
      <CardContent>
        <div
          className={cn(
            "pointer-events-none grid h-min w-full grid-cols-1 items-end space-y-2 transition-all"
          )}
        >
          <ToastPrimitives.Provider swipeDirection="right">
            {playedGameCount !== 0 &&
              playedNotifications.length > 0 &&
              playedNotifications.map(
                (notification, idx) =>
                  notification.component && (
                    <ToastPrimitives.Root
                      className="group  pointer-events-none relative my-auto mb-[8px] flex w-full items-center justify-between overflow-hidden rounded-md p-0 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full"
                      key={notification.order}
                      duration={notification.duration || 4700}
                    >
                      <DefaultNotificationWrapper
                        order={notification.order}
                        payout={notification.payoutInUsd || 0}
                        won={notification.won || false}
                        duration={notification.duration || 5000}
                        tokenImage={tokenImage}
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
        <div className="rounded-md border border-zinc-800 p-[14px]">
          <p className="mb-[14px] font-bold">Live Stats</p>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span className="text-zinc-500">Bets</span>
              {currentOrder}/{playedGameCount || 0}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-zinc-500">Profit</span>
              <div className="flex items-center gap-1">
                {currentProfit > 0 ? (
                  <span className="text-green-500">+${currentProfit}</span>
                ) : currentProfit === 0 ? (
                  <span className="text-zinc-100">$0</span>
                ) : (
                  <span className="text-red-500">-${currentProfit * -1}</span>
                )}
                {tokenImage && (
                  <img
                    alt="token_image"
                    src={`${tokenImage}`}
                    width={16}
                    height={16}
                  />
                )}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-zinc-500">Wins</span>
              {wonCount}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-zinc-500">Losses</span>
              {lossCount}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-zinc-500">vWINR Rewards</span>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex items-center gap-1 text-green-500">
                  {toDecimals(
                    toDecimals(formatEther(data?.result || BigInt(0)), 2) *
                      lastPriceFeed["WINR"],
                    2
                  )}
                  $
                  {/*   <Image
              width={16}
              height={16}
              alt="vwinr_icon"
              src="/images/tokens/vwinr.png"
            /> */}
                </div>
              )}
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant={"secondary"}
          className="w-full"
          size={"lg"}
          disabled={
            !currentAccount ||
            resultSummary.currentProfit <= 0 ||
            !resultSummary
          }
          onClick={() => {
            // share
          }}
        >
          Share
        </Button>
        {isSkippable && (
          <Button
            variant={"default"}
            className="relative h-10 w-10 flex-shrink-0 rounded-[100%] p-0"
            onClick={() => {
              updateIsSkipped(true);
            }}
            disabled={isFinished}
          >
            <IconChevronDown className="absolute left-[15px] h-4 w-4 -rotate-90" />
            <IconChevronDown className="absolute left-[10px] h-4 w-4 -rotate-90" />
          </Button>
        )}
      </CardFooter>
    </>
  );
};

export default Result;
