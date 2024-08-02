import { Body } from "./components/body";
import { Coin } from "./components/coin";
import { CoinFlipGame } from "./components/game";
import { CoinFlipLastBets } from "./components/last-bets";

export const CoinFlip = {
  Game: CoinFlipGame,
  Body,
  Coin,
  LastBets: CoinFlipLastBets,
};

export { default as CoinFlipTemplate } from "./components/template";
export * from "./constants";
export * from "./store";
export * from "./types";
