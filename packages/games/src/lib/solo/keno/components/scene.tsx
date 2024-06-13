import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Keno, useKenoGameStore } from "..";
import { useGameSkip } from "../../../game-provider";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import { initialKenoCells } from "../constants";
import { KenoForm, KenoGameResult } from "../types";

export type KenoSceneProps = {
  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: KenoGameResult[]) => void;
  onAnimationSkipped?: (result: KenoGameResult[]) => void;
};

export const KenoScene: React.FC<KenoSceneProps> = ({
  onAnimationStep,
  onAnimationCompleted,
  onAnimationSkipped = () => {},
}) => {
  const form = useFormContext() as KenoForm;

  const pickEffect = useAudioEffect(SoundEffects.LIMBO_TICK);

  const outComeEffect = useAudioEffect(SoundEffects.KENO_OUTCOME_NUMBER);

  const [currentNumbers, setCurrentNumbers] = React.useState<number[][]>([]);

  const skipRef = React.useRef<boolean>(false);

  const { isAnimationSkipped } = useGameSkip();

  const { kenoGameResults, updateKenoGameResults, updateGameStatus } =
    useKenoGameStore([
      "kenoGameResults",
      "updateKenoGameResults",
      "updateGameStatus",
    ]);

  React.useEffect(() => {
    if (kenoGameResults.length == 0) return;

    const turn = (i = 0) => {
      const resultNumbers = Number(kenoGameResults[i]?.resultNumbers) || [];
      const roundIndex = kenoGameResults[i]?.roundIndex || 0;

      const curr = i + 1;

      onAnimationStep && onAnimationStep(curr);

      // const isWon = kenoSettled?.result?.payoutsInUsd?.[curr] > 0;

      // setCurrentNumbers(
      //   currentNumbers.concat(kenoResult?.[count]?.result.resultNumbers)
      // );

      // if (isWon) {
      //   outComeEffect.play();
      // }

      if (skipRef.current) {
        onSkip();
      } else if (kenoGameResults.length === curr) {
        updateKenoGameResults([]);
        onAnimationCompleted && onAnimationCompleted(kenoGameResults);
        setTimeout(() => updateGameStatus("ENDED"), 1000);
      } else {
        setTimeout(() => turn(curr), 350);
      }
    };

    turn();
  }, [kenoGameResults]);

  const onSkip = () => {
    updateKenoGameResults([]);
    onAnimationSkipped(kenoGameResults);
    setTimeout(() => updateGameStatus("ENDED"), 50);
  };

  React.useEffect(() => {
    skipRef.current = isAnimationSkipped;
  }, [isAnimationSkipped]);

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
      {/* <Keno.MultiplierCarousel currentNumbers={currentNumbers} /> */}
    </>
  );
};
