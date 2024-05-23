export enum Chip {
  ONE = 1,
  TWO = 5,
  THREE = 10,
  FOUR = 20,
  FIVE = 100,
}

export interface ChipControllerProps {
  selectedChip: Chip;
  onSelectedChipChange: (c: Chip) => void;
  isDisabled?: boolean;
  className?: string;
}

export interface ChipProps {
  icon: string;
  value: Chip;
  selectedChip: Chip;
  isDisabled?: boolean;
  onSelectedChipChange: (i: Chip) => void;
}
