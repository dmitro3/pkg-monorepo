"use client";
import * as React from "react";
import { SceneContainer } from "../../common/containers";
import { TextRandomizer } from "./text-randomizer";
import Slider from "./slider";
import { Button } from "@winrlabs/ui";
import useRangeGameStore from "./_store";

export const RangeGame = () => {
  const {
    updateRangeGameResults,
    rangeGameResults,
    updateCurrentAnimationCount,
    currentAnimationCount,
  } = useRangeGameStore([
    "updateRangeGameResults",
    "rangeGameResults",
    "updateCurrentAnimationCount",
    "currentAnimationCount",
  ]);

  async function playRangeAnimation() {}

  React.useEffect(() => {}, [rangeGameResults]);
  return (
    <SceneContainer className="h-[640px] bg-zinc-950 max-md:h-[425px] lg:py-12">
      {/*     <RangeLastBets rangeResult={rangeResult?.result.gameResult} />
      <RangeGameArea />
      <RangeController winMultiplier={winMultiplier} /> */}
      <div className="w-full  lg:pt-[72px]">
        <TextRandomizer />
        <Slider
          rollType={"UNDER"}
          isLoading={false}
          rollValue={50}
          minValue={5}
          maxValue={95}
        />
      </div>
      <Button
        onClick={() => {
          updateRangeGameResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 49,
            },
            {
              payout: 2,
              payoutInUsd: 2,
              resultNumber: 49,
            },
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 10,
            },
          ]);
        }}
      >
        press
      </Button>
    </SceneContainer>
  );
};
