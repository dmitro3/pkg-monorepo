"use client";

import * as Progress from "@radix-ui/react-progress";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { CDN_URL } from "../../../constants";
import { toDecimals, toFormatted } from "../../../utils/web3";
import {
  HOLDEM_POKER_GAME_STATUS,
  HoldemPokerActiveGame,
  HoldemPokerGameProps,
} from "../types";
import { cn } from "../../../utils/style";
import { useEqualizeUnitySound } from "../../../hooks/use-unity-sound";
import { useListenUnityEvent } from "../../../hooks/use-listen-unity-event";
import {
  UnityCallEvent,
  UnityDealEvent,
  UnityFoldEvent,
  UnityNextGameAvailable,
  UnityPlayerHandWin,
  UnityWaitForResult,
} from "../constants";

type HoldemPokerSceneProps = HoldemPokerGameProps & {
  buildedGameUrl: string;
};

const UNITY_LOADER_DELAY = 2500;

export const HoldemPokerScene = ({
  handleDeal,
  handleFinalizeGame,
  setActiveGame,
  onRefresh,
  isInitialDataFetched,
  activeGameData,
  buildedGameUrl,
}: HoldemPokerSceneProps) => {
  const percentageRef = React.useRef(0);

  const BUILDED_GAME_URL = `${buildedGameUrl}/builded-games/holdem-poker`;

  const {
    sendMessage,
    loadingProgression,
    isLoaded: isUnityLoaded,
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  } = useUnityContext({
    loaderUrl: `${BUILDED_GAME_URL}/HoldemPoker.loader.js`,
    dataUrl: `${BUILDED_GAME_URL}/HoldemPoker.data.unityweb`,
    frameworkUrl: `${BUILDED_GAME_URL}/HoldemPoker.framework.js.unityweb`,
    codeUrl: `${BUILDED_GAME_URL}/HoldemPoker.wasm.unityweb`,
  });

  const { unityEvent } = useListenUnityEvent();

  useEqualizeUnitySound({
    sendMessage,
  });

  React.useEffect(() => {
    return () => {
      detachAndUnloadImmediate();
    };
  }, [detachAndUnloadImmediate]);

  React.useEffect(() => {
    percentageRef.current = loadingProgression * 100;
  }, [loadingProgression]);

  React.useEffect(() => {
    console.log(unityEvent, "unity event");

    if (unityEvent.name === UnityDealEvent) {
      console.log("Deal event");

      // first item = ante, second item = aa bonus
      const [ante, aaBonus] = unityEvent.strParam.split(",").map(Number);

      setActiveGame((prev: HoldemPokerActiveGame) => ({
        ...prev,
        anteChipAmount: ante as number,
        aaBonusChipAmount: aaBonus as number,
      }));

      handleDeal(ante, aaBonus, sendMessage);
    }

    if (unityEvent.name === UnityFoldEvent)
      handleFinalizeGame(true, sendMessage);

    if (unityEvent.name === UnityCallEvent)
      handleFinalizeGame(false, sendMessage);

    if (unityEvent.name === UnityPlayerHandWin) {
      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `HP_SetResult|${toDecimals(
          activeGameData.payoutAmount + activeGameData.paybackAmount,
          2
        )}`
      );
    }

    if (unityEvent.name === UnityWaitForResult)
      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `HP_SetWinResult|${toDecimals(activeGameData.result, 2)}`
      );

    if (unityEvent.name === UnityNextGameAvailable) {
      onRefresh();

      sendMessage("WebGLHandler", "ReceiveMessage", "HP_HideResult");
    }
  }, [unityEvent]);

  React.useEffect(() => {
    console.log(
      isInitialDataFetched,
      activeGameData?.cards?.length,
      isUnityLoaded
    );

    if (
      isInitialDataFetched &&
      activeGameData?.cards?.length &&
      isUnityLoaded
    ) {
      const { cards, aaBonusChipAmount, anteChipAmount } = activeGameData;

      console.log(cards, "cards");

      setTimeout(
        () => {
          console.log(" sending data to unity ", activeGameData);

          sendMessage(
            "WebGLHandler",
            "ReceiveMessage",
            `HP_SendData|[${cards.join(
              ","
            )}/${anteChipAmount}/${aaBonusChipAmount}/0]`
          );

          sendMessage(
            "WebGLHandler",
            "ReceiveMessage",
            `HP_InitData|[${cards.join(
              ","
            )}/${anteChipAmount}/${aaBonusChipAmount}/0]`
          );

          sendMessage(
            "WebGLHandler",
            "ReceiveMessage",
            `HP_SetPlayerHandPokerState|${activeGameData.player.combination}`
          );

          sendMessage(
            "WebGLHandler",
            "ReceiveMessage",
            `ChangeState|${HOLDEM_POKER_GAME_STATUS.OnPlay}`
          );
        },

        UNITY_LOADER_DELAY
      );
    }
  }, [isInitialDataFetched, isUnityLoaded]);

  React.useEffect(() => {
    if (isUnityLoaded && currentAccount)
      setTimeout(
        () => sendMessage("WebGLHandler", "ReceiveMessage", "HP_Login"),
        UNITY_LOADER_DELAY
      );
  }, [isUnityLoaded, currentAccount]);

  React.useEffect(() => {
    if (activeGameData?.cards?.length) {
      const { cards, anteChipAmount, aaBonusChipAmount } = activeGameData;

      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `HP_SendData|[${cards.join(
          ","
        )}/${anteChipAmount}/${aaBonusChipAmount}/0]`
      );

      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `HP_SetPlayerHandPokerState|${activeGameData.player.combination}`
      );

      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `HP_SetDealerHandPokerState|${activeGameData.dealer.combination}`
      );

      if (activeGameData.player.cards.length)
        sendMessage(
          "WebGLHandler",
          "ReceiveMessage",
          `HP_SetPlayerCardsData|${activeGameData.player.cards.join(",")}`
        );

      if (activeGameData.dealer.cards.length)
        sendMessage(
          "WebGLHandler",
          "ReceiveMessage",
          `HP_SetDealerCardsData|${activeGameData.dealer.cards.join(",")}`
        );
    }
  }, [activeGameData?.cards]);

  return (
    <>
      {percentageRef.current !== 100 && (
        <div className="wr-absolute wr-left-0 wr-top-0 wr-z-[5] wr-flex wr-h-full wr-w-full wr-flex-col wr-items-center wr-justify-center wr-gap-4">
          <img
            src={`${CDN_URL}/holdem-poker/loader.png`}
            className="wr-absolute wr-left-0 wr-top-0 wr-z-[5] wr-h-full wr-w-full wr-rounded-md wr-object-cover"
          />
          <span
            style={{
              textShadow: "0 0 5px black, 0 0 5px black",
            }}
            className="wr-z-50 wr-text-2xl wr-font-bold wr-text-white"
          >
            {toFormatted(percentageRef.current, 2)} %
          </span>
          <Progress.Root
            className="wr-radius-[1000px] wr-relative wr-z-50 wr-h-[25px] wr-w-[320px] wr-overflow-hidden wr-rounded-md wr-bg-black"
            style={{
              transform: "translateZ(0)",
            }}
            value={percentageRef.current}
          >
            <Progress.Indicator
              className="wr-h-full wr-w-full wr-bg-gradient-to-t wr-from-unity-coinflip-purple-700 wr-to-unity-coinflip-purple-400"
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
            className="wr-z-50 wr-text-2xl wr-font-bold wr-text-white"
          >
            Holdem Poker
          </span>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        className={cn("wr-h-full wr-w-full wr-rounded-md wr-bg-zinc-900")}
      />
    </>
  );
};
