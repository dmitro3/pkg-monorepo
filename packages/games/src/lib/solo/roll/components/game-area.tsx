import { useFormContext } from "react-hook-form";
import React from "react";
import { FormField, FormItem, FormMessage } from "../../../ui/form";
import { cn } from "../../../utils/style";
import Dice from "./dice";
import { ALL_DICES, RollForm } from "../constant";
import { GameAreaProps } from "../types";
import useRollGameStore from "../store";
import { useGameSkip } from "../../../game-provider";
import { SoundEffects, useAudioEffect } from "../../../hooks/use-audio-effect";

export const GameArea: React.FC<GameAreaProps> = ({
  onAnimationCompleted,
  onAnimationStep,
  onAnimationSkipped = () => {},
}) => {
  const form = useFormContext() as RollForm;

  const selectedDices = form.watch("dices");

  const skipRef = React.useRef<boolean>(false);

  const { isAnimationSkipped } = useGameSkip();

  const flipEffect = useAudioEffect(SoundEffects.ROLLING_DICE);

  const winEffect = useAudioEffect(SoundEffects.WIN);

  const [loading, setLoading] = React.useState(false);

  const {
    gameStatus,
    rollGameResults,
    updateRollGameResults,
    updateGameStatus,
    addLastBet,
    updateLastBets,
    lastBets,
  } = useRollGameStore([
    "gameStatus",
    "rollGameResults",
    "updateRollGameResults",
    "updateGameStatus",
    "addLastBet",
    "updateLastBets",
    "lastBets",
  ]);

  React.useEffect(() => {
    if (rollGameResults.length === 0) return;

    const turn = (i = 0) => {
      const dice = Number(rollGameResults[i]?.dice) || 0;
      const payout = rollGameResults[i]?.payout || 0;
      const payoutInUsd = rollGameResults[i]?.payoutInUsd || 0;

      flipEffect.play();

      setLoading(true);
      setTimeout(() => {
        const curr = i + 1;

        onAnimationStep && onAnimationStep(curr);

        addLastBet({
          dice: dice,
          payout,
          payoutInUsd,
        });

        if (payout > 0) {
          winEffect.play();
        }

        if (skipRef.current) {
          onSkip();
        } else if (rollGameResults.length === curr) {
          updateRollGameResults([]);
          onAnimationCompleted && onAnimationCompleted(rollGameResults);
          setTimeout(() => updateGameStatus("ENDED"), 1000);
        } else {
          setTimeout(() => turn(curr), 350);
        }

        setLoading(false);
      }, 1250);
    };
    turn();
  }, [rollGameResults]);

  const onSkip = () => {
    updateLastBets(rollGameResults);
    updateRollGameResults([]);
    onAnimationSkipped(rollGameResults);
    setTimeout(() => updateGameStatus("ENDED"), 50);
  };

  React.useEffect(() => {
    skipRef.current = isAnimationSkipped;
  }, [isAnimationSkipped]);

  console.log({ rollGameResults });

  return (
    <div className="wr-w-full wr-max-w-[422px] wr-relative wr-top-1/2 -wr-translate-y-1/2">
      <FormField
        control={form.control}
        name="dices"
        render={() => (
          <FormItem
            className={cn(
              "wr-grid-row-2 wr-relative wr-grid wr-grid-cols-3 wr-items-center wr-gap-4 wr-transition-all wr-ease-in-out",
              {
                "wr-animate-dice-shake ": loading,
              }
            )}
          >
            {ALL_DICES.map((item) => (
              <Dice
                key={item}
                item={item}
                winner={lastBets[lastBets.length - 1]?.dice}
                isBetting={gameStatus === "PLAYING" ? true : false}
                isDisabled={
                  form.formState.isLoading || form.formState.isSubmitting
                }
              />
            ))}
            {selectedDices.length === 0 ? (
              <span className="wr-absolute -wr-bottom-10 wr-text-md wr-font-bold max-md:wr-w-full max-md:wr-text-center">
                You have to select at least one dice.
              </span>
            ) : (
              <FormMessage className="wr-absolute -wr-bottom-10 wr-text-md wr-font-bold" />
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
