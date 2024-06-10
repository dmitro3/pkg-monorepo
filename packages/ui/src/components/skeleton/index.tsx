import { cn } from "../../utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("wr-animate-pulse wr-rounded-md wr-bg-zinc-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
