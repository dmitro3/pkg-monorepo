import { Body } from "./components/body";
import { Canvas } from "./components/canvas";
import { PlinkoGame } from "./components/game";

export const Plinko = {
  Game: PlinkoGame,
  Body,
  Canvas,
};

export { default as PlinkoTemplate } from "./components/template";

export * from "./store";

export * from "./types";
