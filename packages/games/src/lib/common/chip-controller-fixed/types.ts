export enum ChipFixed {
  ONE = 1,
  TWO = 10,
  THREE = 100,
  FOUR = 1000,
  FIVE = 10000,
}

export interface ChipControllerFixedProps {
  selectedChip: ChipFixed;
  onSelectedChipChange: (c: ChipFixed) => void;
  isDisabled?: boolean;
  className?: string;
}

export interface ChipFixedProps {
  icon: string;
  value: ChipFixed;
  selectedChip: ChipFixed;
  isDisabled?: boolean;
  onSelectedChipChange: (i: ChipFixed) => void;
}
