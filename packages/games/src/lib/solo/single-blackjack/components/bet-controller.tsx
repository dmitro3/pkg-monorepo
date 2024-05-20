import React from "react";
import { SingleBJActiveGameHands } from "..";
import { BetControllerContainer } from "../../../common/containers";
import { BetControllerTitle, WagerFormField } from "../../../common/controller";
import { PreBetButton } from "../../../common/pre-bet-button";
import { Button } from "../../../ui/button";
import { BlackjackGameStatus } from "../../blackjack";
import { useGameOptions } from "../../../game-provider";

interface Props {
  minWager: number;
  maxWager: number;

  activeHandByIndex: SingleBJActiveGameHands["firstHand" | "splittedFirstHand"];
  activeHandChipAmount: number;
  canInsure: boolean;
  status: BlackjackGameStatus;
  isDistributionCompleted: boolean;
  isControllerDisabled: boolean;

  onHit: (handIndex: number) => void;
  onStand: (handIndex: number) => void;
  onSplit: (handIndex: number) => void;
  onDoubleDown: (handIndex: number) => void;
  onInsure: (handIndex: number) => void;
}

export const BetController: React.FC<Props> = ({
  minWager,
  maxWager,
  canInsure,
  activeHandChipAmount,
  activeHandByIndex,
  status,
  isDistributionCompleted,
  isControllerDisabled,

  onHit,
  onStand,
  onDoubleDown,
  onSplit,
  onInsure,
}) => {
  const [showInsuranceBox, setShowInsuranceBox] = React.useState<
    "show" | "hide"
  >("hide");

  React.useEffect(() => {
    if (canInsure) setShowInsuranceBox("show");
  }, [canInsure, activeHandByIndex.handId]);

  const { account } = useGameOptions();

  const hasBalanceForMove = (chipAmount: number): boolean => {
    const _b = account?.balance || 0;
    return _b >= chipAmount;
  };

  return (
    <BetControllerContainer>
      <div className="wr-max-lg:flex wr-max-lg:flex-col">
        <div className="wr-mb-3">
          <BetControllerTitle>Blackjack</BetControllerTitle>
        </div>

        <WagerFormField
          minWager={minWager}
          maxWager={maxWager}
          isDisabled={false}
        />

        <PreBetButton>
          {showInsuranceBox == "show" ? (
            <InsuranceBox
              activeGameIndex={activeHandByIndex.handId || 0}
              onInsure={onInsure}
              setShow={setShowInsuranceBox}
            />
          ) : (
            <div className="wr-grid wr-grid-cols-2 wr-grid-rows-2 wr-gap-x-4 wr-gap-y-5">
              <Button
                onClick={() => onHit(activeHandByIndex.handId || 0)}
                disabled={
                  status == BlackjackGameStatus.FINISHED ||
                  status == BlackjackGameStatus.NONE
                }
                type="button"
                variant="secondary"
                size="xl"
              >
                Hit
              </Button>
              <Button
                onClick={() => onStand(activeHandByIndex.handId || 0)}
                disabled={
                  status == BlackjackGameStatus.FINISHED ||
                  status == BlackjackGameStatus.NONE
                }
                type="button"
                variant="secondary"
                size="xl"
              >
                Stand
              </Button>
              <Button
                onClick={() => onSplit(activeHandByIndex.handId || 0)}
                disabled={
                  !activeHandByIndex?.cards?.canSplit ||
                  !isDistributionCompleted ||
                  isControllerDisabled ||
                  activeHandByIndex.hand?.isSplitted ||
                  status == BlackjackGameStatus.FINISHED ||
                  status == BlackjackGameStatus.NONE
                }
                type="button"
                variant="secondary"
                size="xl"
              >
                Split
              </Button>
              <Button
                onClick={() => onDoubleDown(activeHandByIndex.handId || 0)}
                disabled={
                  !isDistributionCompleted ||
                  isControllerDisabled ||
                  !!((activeHandByIndex.cards?.amountCards || 0) !== 2) ||
                  !hasBalanceForMove(activeHandChipAmount || 0) ||
                  status == BlackjackGameStatus.FINISHED ||
                  status == BlackjackGameStatus.NONE
                }
                type="button"
                variant="secondary"
                size="xl"
              >
                Double
              </Button>
            </div>
          )}
          <Button
            className="wr-w-full wr-mt-6"
            variant="success"
            disabled={status !== BlackjackGameStatus.NONE}
            size="xl"
            type="submit"
          >
            Deal
          </Button>
        </PreBetButton>
      </div>
    </BetControllerContainer>
  );
};

const InsuranceBox: React.FC<{
  activeGameIndex: number;
  onInsure: (handIndex: number) => void;
  setShow: (show: "show" | "hide") => void;
}> = ({ activeGameIndex, onInsure, setShow }) => {
  return (
    <div className="wr-flex wr-flex-col wr-justify-center wr-items-center wr-gap-3 wr-font-bold">
      <h2>Insurance?</h2>
      <div className="wr-grid wr-grid-cols-2 wr-gap-x-2 wr-w-full">
        <Button
          onClick={() => onInsure(activeGameIndex)}
          variant="secondary"
          size="xl"
          className="wr-text-sm wr-font-semibold"
        >
          Accept Insurance
        </Button>
        <Button
          onClick={() => setShow("hide")}
          variant="secondary"
          size="xl"
          className="wr-text-sm wr-font-semibold"
        >
          No Insurance
        </Button>
      </div>
    </div>
  );
};
