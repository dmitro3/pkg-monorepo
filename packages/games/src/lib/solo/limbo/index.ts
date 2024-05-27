import { LimboGame } from "./components/game";
import LastBets from "./components/last-bets";
import ResultAnimation from "./components/result-animation";
import GameArea from "./components/game-area";
import LimboSlider from "./components/slider";

export const Limbo = {
  GameArea,
  LastBets,
  ResultAnimation,
  Game: LimboGame,
  Slider: LimboSlider,
};

export * from "./types";

export { default as LimboTemplate } from "./components/template";
