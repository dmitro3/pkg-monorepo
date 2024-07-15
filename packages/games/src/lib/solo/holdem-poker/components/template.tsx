"use client";

import React from "react";
import { UnityGameContainer } from "../../../common/containers";
import { cn } from "../../../utils/style";

type TemplateProps = {
  minWager?: number;
  maxWager?: number;
  buildedGameUrl: string;
};

export const HoldemPokerTemplate = ({ ...props }: TemplateProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <UnityGameContainer
      className={cn("h-[640px] max-lg:h-full", {
        "fixed -left-0 top-0 z-50 h-[100dvh] w-[100dvw]": isFullscreen,
      })}
    >
      <HoldemPokerScene
        activeGame={activeGame}
        setActiveGame={setActiveGame}
        handleDeal={handleDeal}
        handleFinalizeGame={handleFinalizeGame}
        isInitialDataFetched={isFetched}
      />

      <UnityAudioController className="absolute left-2 top-2" />
      <UnityFullscreenButton
        isFullscreen={isFullscreen}
        onChange={setIsFullscreen}
        className="absolute bottom-2 right-2"
      />
      {isFullscreen && (
        <SelectGameCurrency triggerClassName="!rounded-lg !mr-0 absolute right-2 top-2" />
      )}
    </UnityGameContainer>
  );
};
