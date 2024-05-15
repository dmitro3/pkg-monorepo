"use client";

import React from "react";
import { Chip } from "../../../common/chip-controller/types";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { BlackjackGameProps } from "..";
import { CDN_URL } from "../../../constants";
import { BetController } from "./bet-controller";

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

  return (
    <GameContainer className="wr-relative wr-overflow-hidden wr-pt-0 wr-max-w-[1140px]">
      <SceneContainer
        style={{
          backgroundImage: `url(${CDN_URL}/blackjack/blackjack-bg.png)`,
        }}
        className="wr-relative wr-flex wr-h-[675px] wr-border-0 wr-bg-center !wr-p-0"
      >
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
      </SceneContainer>
    </GameContainer>
  );
};

export default BlackjackTemplate;
