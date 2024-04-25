import { CoinFlipGameResult } from "../_types";

export type CoinFlipGameProps = React.ComponentProps<"div"> & {
  results: CoinFlipGameResult[];
  onAnimationStep?: (step: number) => void;
};

export const CoinFlipGame = ({
  onAnimationStep = () => {},
  results,
  children,
}: CoinFlipGameProps) => {
  return <>{children}</>;
};
