import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import CoinRotate from "./coin-rotate";
import { CoinCanvas, CoinFlipForm, CoinProps } from "../../types";
import { useFormContext } from "react-hook-form";
import { useCoinFlipGameStore } from "../..";
import { Player } from "@lottiefiles/react-lottie-player";
import CoinConfetti from "./lottie/coins-confetti.json";

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

  const { coinFlipGameResults, updateCoinFlipGameResults } =
    useCoinFlipGameStore(["coinFlipGameResults", "updateCoinFlipGameResults"]);

  const form = useFormContext() as CoinFlipForm;

  const coinSide = form.watch("coinSide");

  const lottieRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (coinFlipGameResults.length) {
      const turn = (i = 0) => {
        const side = coinFlipGameResults[i]?.coinSide || 0;
        const payout = coinFlipGameResults[i]?.payout || 0;

        coinRotate.finish(side, 1500).then(() => {
          const curr = i + 1;

          onAnimationStep && onAnimationStep(curr);

          payout > 0 && lottieRef.current.play();

          if (coinFlipGameResults.length === curr) {
            updateCoinFlipGameResults([]);
            onAnimationCompleted && onAnimationCompleted();
          } else {
            setTimeout(() => turn(curr), 250);
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
    console.log(coinFlipGameResults.length);
  }, [coinFlipGameResults]);

  return (
    <>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {coinFlipGameResults.length ? (
          <Player
            ref={lottieRef}
            src={CoinConfetti}
            style={{ width: "600px", height: "600px" }}
          />
        ) : (
          ""
        )}
      </div>
      <Canvas width={width} height={height} onLoad={handleLoad} />
    </>
  );
};
