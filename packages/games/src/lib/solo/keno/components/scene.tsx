import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import { KenoForm, KenoGameResult } from "../types";
import { Keno } from "..";
import { initialKenoCells } from "../constants";

const BUNDLER_WS_URL = process.env.NEXT_PUBLIC_BUNDLER_WS_URL || "";

export const KenoScene = () => {
  const form = useFormContext() as KenoForm;

  const pickEffect = useAudioEffect(SoundEffects.LIMBO_TICK);

  const outComeEffect = useAudioEffect(SoundEffects.KENO_OUTCOME_NUMBER);

  const [kenoResult, setKenoResult] = React.useState<KenoGameResult[]>([]);

  const [kenoSettled, setKenoSettled] = React.useState<any>({});

  const [currentNumbers, setCurrentNumbers] = React.useState<number[][]>([]);

  const intervalRef = React.useRef<NodeJS.Timeout>();

  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (!kenoResult) return;

    const totalNotifications = kenoResult.length;

    if (kenoResult.length > 0) {
      clearPlayedNotifications();

      updateIsFinished(false);

      let count = 0;

      clearTimeout(timeoutRef.current);

      const handleNotification = () => {
        console.log(
          "live result",
          kenoSettled?.result?.payoutsInUsd?.[count] || 0
        );

        const isWon = kenoSettled?.result?.payoutsInUsd?.[count] > 0;

        setCurrentNumbers(
          currentNumbers.concat(kenoResult?.[count]?.result.resultNumbers)
        );

        updatePlayedNotifications({
          order: count + 1,
          payoutInUsd: kenoSettled?.result?.payoutsInUsd?.[count] || 0,
          won: isWon,
          wagerInUsd: kenoSettled?.result?.wagerInUsd || 0,
          component: <></>,
          duration: 4700,
        });

        updateResultSummary({ currentOrder: count + 1 });

        if (isWon) {
          outComeEffect.play();
        }

        count += 1;
      };

      handleNotification();

      intervalRef.current = setInterval(() => {
        if (count < totalNotifications) {
          handleNotification();
        } else {
          clearInterval(intervalRef.current);

          setCurrentNumbers([]);

          setKenoResult([]);

          refreshUserData();

          const profit = liveResult?.result?.profitInUsd || 0;

          const wager = liveResult?.result?.wagerInUsd || 0;

          const payout = profit + wager;

          showWinAnimation({
            profit,
            wager,
            payout,
          });

          timeoutRef.current = setTimeout(() => {
            clearPlayedNotifications();

            updateIsFinished(true);

            clearGameResults();
          }, 5000);
        }
      }, 3000);
    }

    console.log("kenoResult", kenoResult);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [kenoResult, liveResult]);

  const renderCell = (cell: number, win: boolean, loss: boolean) => {
    if (win) {
      return (
        <div className="wr-keno-flip-animation wr-grid wr-animate-keno-gem-flip  wr-grid-cols-3  ">
          <div className="wr-rotateY-180 wr-relative  wr-col-start-2 wr-w-full wr-pt-[100%]">
            <img
              src="/imgs/gems/blue-gem-1.png"
              alt="win"
              className="wr-left-0 wr-top-0 wr-h-full wr-w-full  wr-object-cover"
            />
          </div>
        </div>
      );
    } else if (loss) {
      return (
        <div className="wr-keno-flip-animation wr-grid wr-animate-keno-gem-flip wr-grid-cols-3">
          <div className=" wr-rotateY-180  wr-relative wr-col-start-2 wr-w-full wr-pt-[100%]  ">
            <img
              src="/imgs/gems/black-gem.png"
              alt="loss"
              className="wr-left-0 wr-top-0 wr-h-full wr-w-full  wr-object-cover"
            />
          </div>
        </div>
      );
    } else {
      return cell;
    }
  };

  return (
    <>
      <FormField
        name="selections"
        control={form.control}
        render={({ field }) => (
          <FormItem className="wr-mb-0 wr-w-full">
            <FormField
              control={form.control}
              name="selections"
              render={({ field }) => {
                return (
                  <FormItem className="wr-grid wr-h-full wr-w-full wr-grid-cols-5 wr-grid-rows-5 wr-items-center wr-justify-center wr-gap-2">
                    {initialKenoCells.map((cell, idx) => {
                      return (
                        <FormItem key={idx} className="wr-mb-0 wr-w-full ">
                          <FormControl>
                            <CheckboxPrimitive.Root
                              checked={field.value.includes(cell)}
                              onCheckedChange={(checked) => {
                                if (!checked) {
                                  form.setValue(
                                    "selections",
                                    field.value.filter((item) => item !== cell)
                                  );

                                  pickEffect.play();
                                }

                                if (form.watch("selections").length >= 10) {
                                  return;
                                }

                                if (checked) {
                                  form.setValue(
                                    "selections",
                                    field.value.concat(cell)
                                  );
                                }
                              }}
                              className="wr-h-[34px] wr-w-full wr-rounded-lg wr-bg-keno-cell-bg wr-bg-[size:200%]  wr-bg-no-repeat wr-transition-all wr-duration-300 hover:wr-scale-105 sm:wr-h-[70px]"
                              style={{
                                backgroundPosition: field.value.includes(cell)
                                  ? "100% 90%"
                                  : "top",
                              }}
                            >
                              <div>
                                {renderCell(
                                  cell,
                                  currentNumbers.includes(cell) &&
                                    field.value.includes(cell),
                                  currentNumbers.includes(cell) &&
                                    !field.value.includes(cell)
                                )}
                              </div>
                            </CheckboxPrimitive.Root>
                          </FormControl>
                        </FormItem>
                      );
                    })}
                  </FormItem>
                );
              }}
            />
          </FormItem>
        )}
      />
      <Keno.MultiplierCarousel currentNumbers={currentNumbers} />
    </>
  );
};
