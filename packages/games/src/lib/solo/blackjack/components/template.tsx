"use client";

import React from "react";
import { Chip } from "../../../common/chip-controller/types";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { BlackjackGameProps, BlackjackGameStatus } from "..";
import { CDN_URL } from "../../../constants";
import { BetController } from "./bet-controller";
import { MoveController } from "./move-controller";
import { BlackjackCard } from "../utils";
import styles from "./styles.module.css";
import { cn } from "../../../utils/style";
import { DealerCardArea } from "./dealer-card-area";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = BlackjackGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
};

const BlackjackTemplate: React.FC<TemplateProps> = ({
  activeGameData,
  activeGameHands,
}) => {
  const [selectedChip, setSelectedChip] = React.useState<Chip>(Chip.ONE);

  const [firstHandWager, setFirstHandWager] = React.useState<number>(0);
  const [secondHandWager, setSecondHandWager] = React.useState<number>(0);
  const [thirdHandWager, setThirdHandWager] = React.useState<number>(0);

  // ui cards
  const [dealerCards, setDealerCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [firstHandCards, setFirstHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [secondHandCards, setSecondHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [thirdHandCards, setThirdHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [splittedFirstHandCards, setSplittedFirstHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [splittedSecondHandCards, setSplittedSecondHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  const [splittedThirdHandCards, setSplittedThirdHandCards] = React.useState<
    (BlackjackCard | null)[]
  >([]);

  // splitted card states
  const [firstHandSplittedCard, setFirstHandSplittedCard] =
    React.useState<BlackjackCard | null>(null);

  const [secondHandSplittedCard, setSecondHandSplittedCard] =
    React.useState<BlackjackCard | null>(null);

  const [thirdHandSplittedCard, setThirdHandSplittedCard] =
    React.useState<BlackjackCard | null>(null);

  const [isDistributionCompleted, setIsDistrubitionCompleted] =
    React.useState<boolean>(false);

  const addWager = (wager: number, handIndex: number) => {
    if (handIndex === 0) setFirstHandWager((prev) => prev + wager);

    if (handIndex === 1) setSecondHandWager((prev) => prev + wager);

    if (handIndex === 2) setThirdHandWager((prev) => prev + wager);

    // selectEffect.play();
  };

  const activeHandByIndex = React.useMemo(() => {
    switch (activeGameData.activeHandIndex) {
      case activeGameHands.firstHand.handId:
        return activeGameHands.firstHand;

      case activeGameHands.secondHand.handId:
        return activeGameHands.secondHand;

      case activeGameHands.thirdHand.handId:
        return activeGameHands.thirdHand;

      case activeGameHands.splittedFirstHand.handId:
        return activeGameHands.splittedFirstHand;

      case activeGameHands.splittedSecondHand.handId:
        return activeGameHands.splittedSecondHand;

      case activeGameHands.splittedThirdHand.handId:
        return activeGameHands.splittedThirdHand;

      default:
        return {
          hand: null,
          cards: null,
        };
    }
  }, [activeGameData, isDistributionCompleted, activeGameHands]);

  return (
    <GameContainer className="wr-relative wr-overflow-hidden wr-pt-0 wr-max-w-[1140px]">
      <SceneContainer
        style={{
          backgroundImage: `url(${CDN_URL}/blackjack/blackjack-bg.png)`,
        }}
        className={cn(
          styles.bjSceneWrapper,
          "wr-relative wr-flex wr-h-[675px] wr-border-0 wr-bg-center !wr-p-0"
        )}
      >
        {/* canvas start */}
        <div
          className={cn(
            styles.canvas,
            "wr-absolute wr-h-full wr-max-h-[675px] wr-w-[1140px] wr-select-none"
          )}
        >
          <img
            src={`${CDN_URL}/blackjack/deck.svg`}
            width={105}
            height={115}
            alt="Justbet Blackjack Deck"
            className="wr-absolute wr-right-[-10px] wr-top-[-20px] wr-z-[5]"
          />
          <img
            src={`${CDN_URL}/blackjack/distributed-deck.svg`}
            width={80}
            height={128}
            alt="Justbet Blackjack Distributed Deck"
            className="wr-absolute wr-left-[-35px] wr-top-[100px] wr-z-[5]"
          />

          {/* dealer cards area start */}
          <div className="absolute h-full w-full">
            {activeGameData.status !== BlackjackGameStatus.NONE && (
              <DealerCardArea
                hand={activeGameHands.dealer}
                uiCards={dealerCards}
                activeGameData={activeGameData}
                isDistributionCompleted={isDistributionCompleted}
                isLastDistributionCompleted={false}
              />
            )}
          </div>
          {/* dealer cards area end */}

          {/* controller start */}
          {activeGameData.status !== BlackjackGameStatus.FINISHED &&
            activeGameData.status !== BlackjackGameStatus.NONE && (
              <MoveController
                isDistributionCompleted={false}
                isControllerDisabled={false}
                activeHandByIndex={activeHandByIndex}
                activeGameData={activeGameData}
                activeHandChipAmount={0}
                onHit={() => {}}
                onSplit={() => {}}
                onDoubleDown={() => {}}
                onInsure={() => {}}
                onStand={() => {}}
              />
            )}

          <BetController
            totalWager={10}
            selectedChip={selectedChip}
            onSelectedChipChange={setSelectedChip}
            isDisabled={false}
            isDistributionCompleted={false}
            isLastDistributionCompleted={false}
            status={0}
            onDeal={() => {}}
            onClear={() => {}}
            onRebet={() => {}}
          />
          {/* controller end */}
        </div>
        {/* canvas end */}
      </SceneContainer>
    </GameContainer>
  );
};

export default BlackjackTemplate;
