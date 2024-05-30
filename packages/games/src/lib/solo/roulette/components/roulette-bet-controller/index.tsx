import React from "react";
import { useFormContext } from "react-hook-form";
import { RouletteForm } from "../../types";
// import { Trash, Undo } from "@/components/ui/svgs";
import { PreBetButton } from "../../../../common/pre-bet-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { BetCountSlider } from "../../../../common/containers";
import { BetCount } from "../../../../common/bet-count";
import { NUMBER_INDEX_COUNT } from "../../constants";
import { Button } from "../../../../ui/button";
import { Chip } from "../../../../common/chip-controller/types";
import { ChipController } from "../../../../common/chip-controller";
import { CDN_URL } from "../../../../constants";

export const RouletteBetController: React.FC<{
  isPrepared: boolean;
  selectedChip: Chip;
  onSelectedChipChange: (c: Chip) => void;
  undoBet: () => void;
}> = ({ isPrepared, selectedChip, onSelectedChipChange, undoBet }) => {
  const form = useFormContext() as RouletteForm;

  return (
    <div className="max-md:wr-bg-rotated-bg-blur wr-absolute wr-bottom-0 wr-left-0 wr-z-[5] wr-flex wr-w-full wr-items-end wr-justify-between wr-p-4 max-lg:wr-fixed max-lg:wr-z-10 max-lg:wr-bg-rotated-footer max-lg:wr-p-3 max-lg:wr-pt-0">
      <div className="wr-w-full wr-max-w-[230px] max-md:wr-max-w-[140px]">
        <FormField
          control={form.control}
          name="betCount"
          disabled={isPrepared}
          render={({ field }) => (
            <FormItem className="wr-mb-0">
              <FormLabel className="wr-text-unity-white-50">
                Bet Count
              </FormLabel>
              <FormControl>
                <>
                  <BetCount {...field} />
                  <BetCountSlider maxValue={50} {...field} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <ChipController
        isDisabled={isPrepared}
        selectedChip={selectedChip}
        onSelectedChipChange={onSelectedChipChange}
      />

      <div className="wr-flex wr-w-full wr-max-w-[220px] wr-flex-col wr-items-end wr-gap-2 max-lg:wr-max-w-[200px] max-lg:wr-flex-row-reverse">
        <PreBetButton>
          <Button
            type="submit"
            variant="success"
            size="xl"
            disabled={
              form.getValues().totalWager === 0 ||
              form.formState.isSubmitting ||
              form.formState.isLoading ||
              isPrepared
            }
            isLoading={form.formState.isSubmitting || form.formState.isLoading}
            className="wr-w-full max-lg:wr-max-w-[75px]"
          >
            Bet
          </Button>
        </PreBetButton>
        <div className="wr-flex wr-w-full wr-items-center wr-gap-2">
          <Button
            type="button"
            disabled={isPrepared || form.getValues().totalWager === 0}
            onClick={() => undoBet()}
            variant="third"
            size="xl"
            className="wr-flex wr-w-full wr-items-center wr-gap-1"
          >
            <img
              src={`${CDN_URL}/icons/icon-undo.svg`}
              width={20}
              height={20}
              alt="Justbet Decentralized Casino"
            />
            <span className="max-lg:wr-hidden">Undo</span>
          </Button>

          <Button
            type="button"
            variant="third"
            size="xl"
            className="wr-flex wr-w-full wr-items-center wr-gap-1"
            disabled={isPrepared}
            onClick={() =>
              form.setValue(
                "selectedNumbers",
                new Array(NUMBER_INDEX_COUNT).fill(0)
              )
            }
          >
            <img
              src={`${CDN_URL}/icons/icon-trash.svg`}
              width={20}
              height={20}
              alt="Justbet Decentralized Casino"
            />
            <span className="max-lg:wr-hidden">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
