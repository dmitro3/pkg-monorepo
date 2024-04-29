import { Body } from "./components/body";
import { RangeGame } from "./components/game";
import { Slider } from "./components/slider";
import { Controller } from "./components/controller";
import { TextRandomizer } from "./components/text-randomizer";
import { RangeLastBets } from "./components/last-bets";

export const Dice = {
  Game: RangeGame,
  Slider,
  Body,
  TextRandomizer,
  Controller,
  LastBets: RangeLastBets,
};

export { default as DiceTemplate } from "./components/template";

export * from "./store";
