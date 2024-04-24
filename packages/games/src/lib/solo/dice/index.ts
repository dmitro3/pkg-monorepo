import { Body } from "./components/body";
import { RangeGame } from "./components/game";
import {Slider} from "./components/slider";
import { Controller } from "./components/controller";
import { TextRandomizer } from "./components/text-randomizer";

export const Dice = {
  Game: RangeGame,
  Slider,
  Body,
  TextRandomizer,
  Controller
};

export { default as DiceTemplate } from "./components/template"

export * from "./store"