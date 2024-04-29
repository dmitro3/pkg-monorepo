import * as Slider from "@radix-ui/react-slider";
import { cn } from "@winrlabs/ui";
import { useFormContext } from "react-hook-form";
import { AudioContextProvider } from "../../hooks/use-audio-effect";

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

export const BetControllerContainer: React.FC<Props> = ({
  children,
  className,
}) => {
  return (
    <AudioContextProvider>
      <section
        className={cn(
          "flex flex-shrink-0 flex-col justify-between rounded-lg bg-zinc-900 p-4 lg:w-[340px]",
          className
        )}
      >
        {children}
      </section>
    </AudioContextProvider>
  );
};

export const BetCountSlider = ({ ...props }) => {
  const form = useFormContext();

  return (
    <Slider.Root
      className={cn(
        "relative -mt-2 flex w-full touch-none select-none items-center"
      )}
      min={1}
      value={[props.value]}
      max={props.maxValue}
      onValueChange={(e) => {
        form.setValue("betCount", e[0], { shouldValidate: true });
      }}
    >
      <Slider.Track className="relative h-[6px] w-full grow cursor-pointer overflow-hidden rounded-full rounded-tl-md rounded-tr-md bg-zinc-600">
        <Slider.Range className="absolute h-full bg-red-600" />
      </Slider.Track>
      <Slider.Thumb className="border-primary ring-offset-background focus-visible:ring-ring flex  h-[10px] w-[10px] cursor-pointer items-center justify-center rounded-full border-2 bg-white text-[12px] font-medium text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};
