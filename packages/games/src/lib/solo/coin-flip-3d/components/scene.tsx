import * as Progress from "@radix-ui/react-progress";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useDevicePixelRatio } from "../../../hooks/use-device-pixel-ratio";
import { useListenUnityEvent } from "../../../hooks/use-listen-unity-event";
import { useEqualizeUnitySound } from "../../../hooks/use-unity-sound";
import { toFormatted } from "../../../utils/web3";
import useCoinFlipGameStore from "../store";
import { CoinFlipGameProps } from "./game";
import { COIN_SIDE } from "../constants";

const UnityFlipEndEvent = "CF_FlipEnd";

const UnitySequenceFlipEndEvent = "CF_FlipSequenceEnd";

type ExtendedCoinFlipGameProps = CoinFlipGameProps & { buildedGameUrl: string };

export const CoinFlipScene = ({
  onAnimationStep,
  onAnimationCompleted,
  buildedGameUrl,
}: ExtendedCoinFlipGameProps) => {
  const percentageRef = React.useRef(0);

  const devicePixelRatio = useDevicePixelRatio();

  const BUILDED_GAME_URL = `${buildedGameUrl}/builded-games/coin-flip`;

  const {
    coinFlipGameResults,
    updateCoinFlipGameResults,
    updateGameStatus,
    addLastBet,
  } = useCoinFlipGameStore([
    "coinFlipGameResults",
    "updateCoinFlipGameResults",
    "updateGameStatus",
    "addLastBet",
  ]);

  const {
    sendMessage,
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

    if (currentResult) {
      if (unityEvent.name === UnityFlipEndEvent) {
        currentResult?.payout > 0 &&
          sendMessage("WebGLHandler", "ReceiveMessage", "CF_Win");

        onAnimationStep && onAnimationStep(count);

        const side =
          (coinFlipGameResults[count]?.coinSide.toString() as COIN_SIDE) || "0";

        const payout = coinFlipGameResults[count]?.payout || 0;

        const payoutInUsd = coinFlipGameResults[count]?.payoutInUsd || 0;

        addLastBet({
          coinSide: side,
          payout,
          payoutInUsd,
        });

        setCount(count + 1);
      }

      if (unityEvent.name === UnitySequenceFlipEndEvent) {
        currentResult?.payout > 0 &&
          sendMessage("WebGLHandler", "ReceiveMessage", "CF_Win");

        setCount(0);

        updateCoinFlipGameResults([]);

        onAnimationCompleted && onAnimationCompleted(coinFlipGameResults);

        setTimeout(() => updateGameStatus("ENDED"), 1000);

        onAnimationStep && onAnimationStep(0);
      }
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
