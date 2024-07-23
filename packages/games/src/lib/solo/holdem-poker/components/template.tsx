"use client";

import React from "react";

import { UnityAudioController } from "../../../common/audio-controller";
import { UnityGameContainer } from "../../../common/containers";
import { UnityFullscreenButton } from "../../../common/controller";
import { cn } from "../../../utils/style";
import { HoldemPokerGameProps } from "../types";
import { HoldemPokerScene } from "./scene";

type TemplateProps = HoldemPokerGameProps & {
  minWager?: number;
  maxWager?: number;
  buildedGameUrl: string;
};

const HoldemPokerTemplate = ({ ...props }: TemplateProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <UnityGameContainer
      className={cn("wr-h-[640px] wr-relative max-lg:wr-h-full", {
        "wr-fixed -wr-left-0 wr-top-0 wr-z-50 wr-h-[100dvh] wr-w-[100dvw]":
          isFullscreen,
      })}
    >
      <HoldemPokerScene {...props} />

      <UnityAudioController className="wr-absolute wr-left-2 wr-top-2" />
      <UnityFullscreenButton
        isFullscreen={isFullscreen}
        onChange={setIsFullscreen}
        className="wr-absolute wr-right-2 wr-top-2"
      />
    </UnityGameContainer>
  );
};
export default HoldemPokerTemplate;
