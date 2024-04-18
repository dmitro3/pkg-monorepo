import { Body } from "./body";
import { RangeGame } from "./game";
import {Slider} from "./slider";
import { Controller } from "./controller";
import { TextRandomizer } from "./text-randomizer";

const Dice = {
  Game: RangeGame,
  Slider,
  Body,
  TextRandomizer,
  Controller
};

export default Dice;
