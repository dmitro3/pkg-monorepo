import { useFormContext } from "react-hook-form";
import React from "react";
import { FormField, FormItem, FormMessage } from "../../../ui/form";
import { cn } from "../../../utils/style";
import Dice from "./dice";
import { ALL_DICES, DiceForm } from "../constant";
import { GameAreaProps } from "../types";

export const GameArea: React.FC<GameAreaProps> = ({ winner, loading }) => {
  const form = useFormContext() as DiceForm;

  const selectedDices = form.watch("dices");

  return (
    <div className="wr-w-full wr-max-w-[422px]">
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
                winner={winner}
                isBetting={loading}
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
