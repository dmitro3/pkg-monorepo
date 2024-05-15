import { CDN_URL } from "../../../constants";
import { RockPaperScissors } from "../types";

export const ALL_RPS_CHOICES = [
  RockPaperScissors.ROCK,
  RockPaperScissors.PAPER,
  RockPaperScissors.SCISSORS,
] as const;

export const rpsChoiceMap = {
  [RockPaperScissors.ROCK]: {
    label: "Rock",
    icon: `${CDN_URL}/rps/icon-rock.svg`,
  },
  [RockPaperScissors.PAPER]: {
    label: "Paper",
    icon: `${CDN_URL}/rps/icon-paper.svg`,
  },
  [RockPaperScissors.SCISSORS]: {
    label: "Scissors",
    icon: `${CDN_URL}/rps/icon-scissors.svg`,
  },
} as const;
