import { RockPaperScissors } from "../types";

export const ALL_RPS_CHOICES = [
  RockPaperScissors.ROCK,
  RockPaperScissors.PAPER,
  RockPaperScissors.SCISSORS,
] as const;

export const rpsChoiceMap = {
  [RockPaperScissors.ROCK]: { label: "Rock", icon: "/svgs/icon-rock.svg" },
  [RockPaperScissors.PAPER]: { label: "Paper", icon: "/svgs/icon-paper.svg" },
  [RockPaperScissors.SCISSORS]: {
    label: "Scissors",
    icon: "/svgs/icon-scissors.svg",
  },
} as const;
