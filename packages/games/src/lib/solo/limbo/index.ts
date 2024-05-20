import { LimboGame } from "./components/game";
import LastBets from "./components/last-bets";
import ResultAnimation from "./components/result-animation";
import Scene from "./components/scene";
import LimboSlider from "./components/slider";

export const Limbo = {
  Scene,
  LastBets,
  ResultAnimation,
  Game: LimboGame,
  Slider: LimboSlider,
};

export * from "./types";

export { default as LimboTemplate } from "./components/template";
