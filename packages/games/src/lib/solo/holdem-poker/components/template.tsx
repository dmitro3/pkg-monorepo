"use client";

import React from "react";
import { UnityGameContainer } from "../../../common/containers";
import { cn } from "../../../utils/style";
import { UnityAudioController } from "../../../common/audio-controller";
import { UnityFullscreenButton } from "../../../common/controller";
import { HoldemPokerGameProps } from "../types";

type TemplateProps = HoldemPokerGameProps & {
  minWager?: number;
  maxWager?: number;
  buildedGameUrl: string;
};

export const HoldemPokerTemplate = ({
  minWager,
  maxWager,
  buildedGameUrl,
  activeGameData,
  isInitialDataFetched,

  handleDeal,
  handleFinalizeGame,
}: TemplateProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <UnityGameContainer
      className={cn("wr-h-[640px] max-lg:wr-h-full", {
        "wr-fixed -wr-left-0 wr-top-0 wr-z-50 wr-h-[100dvh] wr-w-[100dvw]":
          isFullscreen,
      })}
    >
      {/* <HoldemPokerScene
        activeGame={activeGame}
        setActiveGame={setActiveGame}
        handleDeal={handleDeal}
        handleFinalizeGame={handleFinalizeGame}
        isInitialDataFetched={isFetched}
      /> */}

      <UnityAudioController className="wr-absolute wr-left-2 wr-top-2" />
      <UnityFullscreenButton
        isFullscreen={isFullscreen}
        onChange={setIsFullscreen}
        className="wr-absolute wr-bottom-2 wr-right-2"
      />
    </UnityGameContainer>
  );
};
