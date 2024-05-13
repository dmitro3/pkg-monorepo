"use client";

import { GameContainer, SceneContainer } from "../../../common/containers";
import { CDN_URL } from "../../../constants";

const BlackjackTemplate = () => {
  return (
    <GameContainer className="wr-relative wr-overflow-hidden wr-pt-0">
      <SceneContainer
        className={`wr-relative wr-flex wr-h-[675px] wr-border-0 wr-bg-center !wr-p-0 [background-image:url('${CDN_URL}/blackjack/blackjack-bg.png')]`}
      >
        asd
      </SceneContainer>
    </GameContainer>
  );
};

export default BlackjackTemplate;
