import { cn } from "@winrlabs/ui";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const SceneContainer: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center justify-between rounded-lg border border-zinc-800 bg-cover bg-no-repeat p-3.5  lg:px-16 lg:pb-12 lg:pt-[14px]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export const GameContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("flex gap-3 pt-3 max-lg:flex-col-reverse", className)}>
      {children}
    </div>
  );
};
