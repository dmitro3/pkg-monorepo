import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import CoinRotate from "./coin-rotate";
import { CoinCanvas, CoinFlipForm, CoinProps } from "../../types";
import { useFormContext } from "react-hook-form";
import { useCoinFlipGameStore } from "../..";
import { Player } from "@lottiefiles/react-lottie-player";
import CoinConfetti from "./lottie/coins-confetti.json";
import {
  SoundEffects,
  useAudioEffect,
} from "../../../../hooks/use-audio-effect";

export const Coin: React.FC<CoinProps> = ({
  width,
  height,
  onAnimationCompleted,
  onAnimationStep,
}) => {
  const [coinRotate] = useState<CoinRotate>(new CoinRotate());
  const handleLoad = (canvas: CoinCanvas) => {
    coinRotate.setCanvas(canvas).initialize();
  };

  const flipEffect = useAudioEffect(SoundEffects.COIN_FLIP_TOSS);
  const winEffect = useAudioEffect(SoundEffects.COIN_FLIP_WIN);

  const {
    gameStatus,
    coinFlipGameResults,
    updateCoinFlipGameResults,
    updateGameStatus,
  } = useCoinFlipGameStore([
    "gameStatus",
    "coinFlipGameResults",
    "updateCoinFlipGameResults",
    "updateGameStatus",
  ]);

  const form = useFormContext() as CoinFlipForm;

  const coinSide = form.watch("coinSide");

  const lottieRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (coinFlipGameResults.length) {
      const turn = (i = 0) => {
        const side = coinFlipGameResults[i]?.coinSide || 0;
        const payout = coinFlipGameResults[i]?.payout || 0;

        flipEffect.play();

        coinRotate.finish(side, 1250).then(() => {
          const curr = i + 1;

          onAnimationStep && onAnimationStep(curr);

          if (payout > 0) {
            lottieRef.current.play();
            winEffect.play();
          }

          if (coinFlipGameResults.length === curr) {
            updateCoinFlipGameResults([]);
            onAnimationCompleted && onAnimationCompleted();
            updateGameStatus("ENDED");
          } else {
            setTimeout(() => turn(curr), 350);
          }
        });
      };

      turn();
    }
  }, [coinFlipGameResults]);

  useEffect(() => {
    coinRotate.flipTo(coinSide, 1000);
  }, [coinSide]);

  useEffect(() => {
    console.log(gameStatus);
  }, [gameStatus]);

  return (
    <>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Player
          ref={lottieRef}
          src={CoinConfetti}
          keepLastFrame={false}
          style={{
            width: "600px",
            height: "600px",
          }}
        />
      </div>
      <Canvas width={width} height={height} onLoad={handleLoad} />
    </>
  );
};
