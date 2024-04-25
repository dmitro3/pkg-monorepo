import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import CoinRotate from "./coin-rotate";
import { CoinCanvas, CoinFlipForm, CoinProps } from "../../_types";
import { useFormContext } from "react-hook-form";

export const Coin: React.FC<CoinProps> = ({ width, height }) => {
  const [coinRotate] = useState<CoinRotate>(new CoinRotate());
  const handleLoad = (canvas: CoinCanvas) => {
    coinRotate.setCanvas(canvas).initialize();
  };

  const form = useFormContext() as CoinFlipForm;

  const coinSide = form.watch("coinSide");

  // useEffect(() => {
  //   if (results?.length && event) {
  //     const turn = (i = 0) => {
  //       flipEffect.play();

  //       if (!skipRef.current) {
  //         onEachBetResult(i);
  //       }

  //       coinRotate.finish(results[i], 1000).then(() => {
  //         const order = i + 1;

  //         if (skipRef.current) {
  //           onGameCompleted();
  //           coinRotate.finish(results[results.length], 1250);
  //           return;
  //         } else if (results.length === order) {
  //           onGameCompleted();
  //         } else {
  //           setTimeout(() => turn(order), 250);
  //         }
  //       });
  //     };
  //     // we used timeout here because of result sync
  //     setTimeout(() => turn(0), 250);
  //   }
  // }, [results, event]);

  useEffect(() => {
    coinRotate.flipTo(coinSide, 1000);
  }, [coinSide]);

  return <Canvas width={width} height={height} onLoad={handleLoad} />;
};
