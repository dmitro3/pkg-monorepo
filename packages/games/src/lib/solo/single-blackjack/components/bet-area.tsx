import { cn } from "../../../utils/style";

export const BetArea: React.FC<{ isTurn: boolean; className?: string }> = ({
  isTurn,
  className,
}) => {
  return (
    <div
      className={cn(
        "wr-absolute wr-w-16 wr-h-16 wr-border-2 wr-bg-white wr-bg-opacity-30 wr-border-zinc-500 wr-rounded-full wr-z-[-1]",
        className && className,
        { "wr-animate-blackjack-highlight": isTurn }
      )}
    />
  );
};
