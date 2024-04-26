import { CoinFlipGame } from "./components/game";
import { Body } from "./components/body";
import { Coin } from "./components/coin";
import { CoinFlipController } from "./components/controller";

export const CoinFlip = {
  Game: CoinFlipGame,
  Body,
  Coin,
  Controller: CoinFlipController,
};

export { default as CoinFlipTemplate } from "./components/template";

export * from "./store";

export * from "./types";

export * from "./constants";
