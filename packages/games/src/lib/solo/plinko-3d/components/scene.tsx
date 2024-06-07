"use client";

import * as Progress from "@radix-ui/react-progress";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Unity } from "react-unity-webgl";
import { useListenUnityEvent } from "../../../hooks/use-listen-unity-event";
import { toFormatted } from "../../../utils/web3";
import { Plinko3dForm } from "../types";
import usePlinkoLastBetsStore from "../store";
import { useUnityPlinko } from "../hooks/use-unity-plinko";

const UnityScoreEvent = "Score";

export const PlinkoScene = ({
  count,
  setCount,
  status,
  setStatus,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  status: "idle" | "playing" | "success";
  setStatus: React.Dispatch<
    React.SetStateAction<"idle" | "playing" | "success">
  >;
}) => {
  // const { useListenUnityEvent }

  const form = useFormContext() as Plinko3dForm;

  const {
    detachAndUnloadImmediate,
    handlePlinkoSize,
    handleSpawnBalls,
    unityProvider,
    loadingProgression,
  } = useUnityPlinko({ buildedGameUrl: "ads" });

  const { unityEvent } = useListenUnityEvent();

  // const { showWinAnimation } = useShowWinAnimation();

  const plinkoSize = form.watch("plinkoSize");

  React.useEffect(() => {
    if (plinkoSize >= 6 && plinkoSize <= 12) {
      setTimeout(() => {
        handlePlinkoSize(plinkoSize);
      }, 300);
    }
  }, [plinkoSize]);

  const { addLastBet } = usePlinkoLastBetsStore(["addLastBet"]);

  React.useEffect(() => {
    if (!liveResult) return;

    const gameResult = liveResult?.result?.gameResult;

    handleSpawnBalls(gameResult);
  }, [liveResult]);

  React.useEffect(() => {
    if (!liveResult) return;

    if (!liveResult?.result?.gameResult) return;

    const currentPayout = liveResult?.result?.payoutsInUsd?.[count] || 0;

    const currentWagerPerGame = liveResult?.result?.wagerInUsd || 0;

    const isWon = currentPayout > currentWagerPerGame;

    if (unityEvent.name === UnityScoreEvent) {
      console.log("multiplier", unityEvent.strParam);

      addLastBet({
        isWon: Number(unityEvent.strParam) > 1,
        multiplier: unityEvent.strParam,
      });

      setCount(count + 1);
    }
  }, [unityEvent]);

  React.useEffect(() => {
    if (count === liveResult?.result?.gameResult?.length) {
      setTimeout(() => {
        setStatus("idle");

        setCount(0);

        updateIsFinished(true);
      }, 500);
    }
  }, [count, liveResult]);

  const percentageRef = React.useRef(0);

  React.useEffect(() => {
    return () => {
      detachAndUnloadImmediate();
    };
  }, [detachAndUnloadImmediate]);

  React.useEffect(() => {
    percentageRef.current = loadingProgression * 100;
  }, [loadingProgression]);

  return (
    <>
      {percentageRef.current !== 100 && (
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center gap-4  bg-zinc-900">
          <img
            src={"/images/games/plinko/loader.png"}
            alt="loader"
            className="absolute left-0 top-0 z-[5] h-full w-full rounded-md"
          />
          <span
            style={{
              textShadow: "0 0 5px black, 0 0 5px black",
            }}
            className="z-50 text-2xl font-bold text-white"
          >
            {toFormatted(percentageRef.current, 2)} %
          </span>
          <Progress.Root
            className="radius-[1000px] relative z-50 h-[25px] w-[320px] overflow-hidden rounded-md bg-black"
            style={{
              transform: "translateZ(0)",
            }}
            value={percentageRef.current}
          >
            <Progress.Indicator
              className="h-full w-full bg-gradient-to-t from-unity-horse-race-blue-400 to-unity-horse-race-blue-600"
              style={{
                transform: `translateX(-${100 - percentageRef.current}%)`,
                transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            />
          </Progress.Root>
          <span
            style={{
              textShadow: "0 0 5px black, 0 0 5px black",
            }}
            className="z-50 text-2xl font-bold text-white"
          >
            Plinko
          </span>
        </div>
      )}
      <div className="w-full max-lg:border-b  max-lg:border-zinc-800 ">
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={devicePixelRatio}
          className="h-full w-full rounded-t-md bg-zinc-900 max-md:h-[360px] lg:rounded-md"
        />
      </div>
    </>
  );
};
