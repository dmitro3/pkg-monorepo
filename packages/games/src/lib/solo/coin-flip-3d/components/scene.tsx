import React from "react";
import { toFormatted } from "../../../utils/web3";
import * as Progress from "@radix-ui/react-progress";
import { Unity, useUnityContext } from "react-unity-webgl";
import useCoinFlipGameStore from "../store";
import { useEqualizeUnitySound } from "../../../hooks/use-unity-sound";
import { useListenUnityEvent } from "../../../hooks/use-listen-unity-event";
import { useDevicePixelRatio } from "../../../hooks/use-device-pixel-ratio";

const BUILDED_GAME_URL = `${process.env.NEXT_PUBLIC_BASE_CDN_URL}/builded-games/coin-flip`;

const UnityFlipEndEvent = "CF_FlipEnd";

const UnitySequenceFlipEndEvent = "CF_FlipSequenceEnd";

export const CoinFlipScene = () => {
  const percentageRef = React.useRef(0);

  const devicePixelRatio = useDevicePixelRatio();

  const {
    gameStatus,
    coinFlipGameResults,
    updateCoinFlipGameResults,
    updateGameStatus,
    addLastBet,
    updateLastBets,
  } = useCoinFlipGameStore([
    "gameStatus",
    "coinFlipGameResults",
    "updateCoinFlipGameResults",
    "updateGameStatus",
    "addLastBet",
    "updateLastBets",
  ]);

  const {
    sendMessage,
    isLoaded,
    loadingProgression,
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  } = useUnityContext({
    loaderUrl: `${BUILDED_GAME_URL}/CoinFlipV2.loader.js`,
    dataUrl: `${BUILDED_GAME_URL}/CoinFlipV2.data.unityweb`,
    frameworkUrl: `${BUILDED_GAME_URL}/CoinFlipV2.framework.js.unityweb`,
    codeUrl: `${BUILDED_GAME_URL}/CoinFlipV2.wasm.unityweb`,
  });

  useEqualizeUnitySound({
    sendMessage,
  });

  const { unityEvent } = useListenUnityEvent();

  const [count, setCount] = React.useState(0);

  const { refreshUserData } = useAfterEachGame({});

  React.useEffect(() => {
    return () => {
      detachAndUnloadImmediate();
    };
  }, [detachAndUnloadImmediate]);

  React.useEffect(() => {
    if (coinFlipGameResults.length === 0) return;

    const gameResult = coinFlipGameResults;

    const parsedResults = gameResult?.map((item) => item.coinSide).join(",");

    console.log(parsedResults, "parseddresults");

    sendMessage("WebGLHandler", "ReceiveMessage", `CF_Flip|${parsedResults}`);
  }, [coinFlipGameResults]);

  React.useEffect(() => {
    if (coinFlipGameResults.length === 0) return;

    const currentResult = coinFlipGameResults?.[count];

    if (unityEvent.name === UnityFlipEndEvent) {
      currentResult?.payout > 0 &&
        sendMessage("WebGLHandler", "ReceiveMessage", "CF_Win");

      updatePlayedNotifications({
        order: count + 1,
        payoutInUsd: liveResult?.result?.gameResult?.[count]?.payoutInUsd || 0,
        won: (liveResult?.result?.gameResult?.[count]?.payout || 0) > 0,
        wagerInUsd: liveResult?.result?.wagerInUsd || 0,
        component: <LastBet result={liveResult?.result?.gameResult?.[count]} />,
        duration: 5000,
      });

      addLastBet({
        coinSide: liveResult?.result?.gameResult?.[count]?.coinSide || 0,
        payout: liveResult?.result?.gameResult?.[count]?.payout || 0,
        payoutInUsd: liveResult?.result?.gameResult?.[count]?.payoutInUsd || 0,
      });

      setCount(count + 1);
    }

    if (unityEvent.name === UnitySequenceFlipEndEvent) {
      currentResult?.payout > 0 &&
        sendMessage("WebGLHandler", "ReceiveMessage", "CF_Win");

      setCount(0);

      updateIsFinished(true);

      refreshUserData();

      const totalProfit = liveResult?.result?.profitInUsd || 0;

      const totalWager = liveResult?.result?.wagerInUsd || 0;

      const payoutInUsd = totalProfit + totalWager;

      showWinAnimation({
        profit: totalProfit,
        wager: totalWager,
        payout: payoutInUsd,
      });
    }
  }, [unityEvent]);

  React.useEffect(() => {
    percentageRef.current = loadingProgression * 100;
  }, [loadingProgression]);

  return (
    <>
      {percentageRef.current !== 100 && (
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center gap-4  bg-zinc-900">
          <img
            src={"/images/coin-flip/loader.png"}
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
              className="h-full w-full bg-gradient-to-t from-unity-coinflip-purple-700 to-unity-coinflip-purple-400"
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
            Coin Flip
          </span>
        </div>
      )}
      <div className="w-full max-lg:border-b max-lg:border-zinc-800 ">
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={devicePixelRatio}
          className="h-full w-full rounded-t-md bg-zinc-900 max-md:h-[425px] lg:rounded-md"
        />
      </div>
    </>
  );
};
