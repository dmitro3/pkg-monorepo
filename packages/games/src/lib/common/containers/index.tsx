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
        "wr-relative wr-flex wr-w-full wr-flex-col wr-items-center wr-justify-between wr-rounded-lg wr-border wr-border-zinc-800 wr-bg-cover wr-bg-no-repeat wr-p-3.5 wr- lg:wr-px-16 lg:wr-pb-12 lg:wr-pt-[14px]",
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
    <div
      className={cn(
        "wr-flex wr-gap-3 wr-pt-3 max-lg:wr-flex-col-reverse",
        className
      )}
    >
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
          "wr-flex wr-flex-shrink-0 wr-flex-col wr-justify-between wr-rounded-lg wr-bg-zinc-900 wr-p-4 lg:wr-w-[340px]",
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
        "wr-relative -wr-mt-2 wr-flex wr-w-full wr-touch-none wr-select-none wr-items-center",
        {
          "wr-cursor-none wr-pointer-events-none wr-opacity-60": props.disabled,
        }
      )}
      min={1}
      value={[props.value]}
      max={props.maxValue}
      onValueChange={(e) => {
        form.setValue("betCount", e[0], { shouldValidate: true });
      }}
    >
      <Slider.Track className="wr-relative wr-h-[6px] wr-w-full wr-grow wr-cursor-pointer wr-overflow-hidden wr-rounded-full wr-rounded-tl-md wr-rounded-tr-md wr-bg-zinc-600">
        <Slider.Range className="wr-absolute wr-h-full wr-bg-red-600" />
      </Slider.Track>
      <Slider.Thumb className="wr-border-primary wr-ring-offset-background wr-focus-visible:ring-ring wr-flex wr-h-[10px] wr-w-[10px] wr-cursor-pointer wr-items-center wr-justify-center wr-rounded-full wr-border-2 wr-bg-white wr-text-[12px] wr-font-medium wr-text-zinc-900 wr-transition-colors wr-focus-visible:outline-none wr-focus-visible:ring-2 wr-focus-visible:ring-offset-2 wr-disabled:pointer-events-none wr-disabled:opacity-50" />
    </Slider.Root>
  );
};
