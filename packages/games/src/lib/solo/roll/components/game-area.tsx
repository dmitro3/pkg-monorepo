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
    <div className="w-full max-w-[422px]">
      <FormField
        control={form.control}
        name="dices"
        render={() => (
          <FormItem
            className={cn(
              "grid-row-2 relative grid grid-cols-3 items-center gap-4 transition-all ease-in-out",
              {
                "animate-dice-shake ": loading,
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
              <span className="absolute -bottom-10 text-lg font-bold max-md:w-full max-md:text-center">
                You have to select at least one dice.
              </span>
            ) : (
              <FormMessage className="absolute -bottom-10 text-lg font-bold" />
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
