import React from "react";
import { useFormContext } from "react-hook-form";
import { PreBetButton } from "../../../common/pre-bet-button";
import { CDN_URL } from "../../../constants";
import { Button } from "../../../ui/button";
import { ChipController } from "../../../common/chip-controller";
import { Chip } from "../../../common/chip-controller/types";
import { TotalWager, MaxPayout } from "../../../common/wager";

export interface BaccaratBetControllerProps {
  totalWager: number;
  maxPayout: number;
  selectedChip: Chip;
  isDisabled: boolean;
  onSelectedChipChange: (chip: Chip) => void;
  undoBet: () => void;
}

export const BaccaratBetController: React.FC<BaccaratBetControllerProps> = ({
  totalWager,
  maxPayout,
  selectedChip,
  isDisabled,
  onSelectedChipChange,
  undoBet,
}) => {
  const form = useFormContext();

  return (
    <div className="max-md:bg-rotated-bg-blur absolute bottom-0 left-0 z-[5] flex w-full items-end justify-between p-4 max-lg:fixed max-lg:z-10 max-lg:bg-rotated-footer max-lg:p-3 max-lg:pt-0">
      <div className="flex w-full max-w-[230px] items-center justify-between gap-2 max-md:max-w-[140px]">
        <div className="flex w-full flex-col gap-2">
          <span className="text-unity-white-50">Total Wager</span>
          <TotalWager
            containerClassName="bg-unity-white-15"
            wager={totalWager}
            betCount={1}
          />
        </div>
        <div className="flex w-full flex-col gap-2 max-lg:hidden">
          <span className="text-unity-white-50">Max Payout</span>
          <MaxPayout
            containerClassName="bg-unity-white-15"
            maxPayout={maxPayout}
          />
        </div>
      </div>

      <ChipController
        isDisabled={isDisabled}
        selectedChip={selectedChip}
        onSelectedChipChange={onSelectedChipChange}
      />
      <div className="flex w-full max-w-[220px] flex-col items-end gap-2 max-lg:max-w-[200px] max-lg:flex-row-reverse">
        <PreBetButton>
          <Button
            type="submit"
            variant="success"
            size="xl"
            disabled={
              totalWager === 0 ||
              form.formState.isSubmitting ||
              form.formState.isLoading ||
              isDisabled
            }
            isLoading={form.formState.isSubmitting || form.formState.isLoading}
            className="w-full max-lg:max-w-[75px]"
          >
            Deal
          </Button>
          <div className="flex w-full items-center gap-2">
            <Button
              type="button"
              disabled={totalWager === 0 || isDisabled}
              variant="third"
              size="xl"
              className="flex w-full items-center gap-1"
              onClick={() => undoBet()}
            >
              <img
                src={`${CDN_URL}/icons/icon-undo.svg`}
                width={20}
                height={20}
                alt="Justbet Decentralized Casino"
              />
              <span className="max-lg:hidden">Undo</span>
            </Button>

            <Button
              type="button"
              variant="third"
              size="xl"
              className="flex w-full items-center gap-1"
              disabled={totalWager === 0 || isDisabled}
              onClick={() => form.reset()}
            >
              <img
                src={`${CDN_URL}/icons/icon-trash.svg`}
                width={20}
                height={20}
                alt="Justbet Decentralized Casino"
              />
              <span className="max-lg:hidden">Clear</span>
            </Button>
          </div>
        </PreBetButton>
      </div>
    </div>
  );
};
