"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "focus-visible:wr-ui-ring-ring wr-ui-inline-flex wr-ui-h-2 wr-ui-items-center wr-ui-justify-center wr-ui-rounded-md wr-ui-px-3 wr-ui-py-0 wr-ui-text-[15px] wr-ui-font-semibold wr-ui-leading-4 wr-ui- wr-ui-transition wr-ui-duration-300 wr-ui-ease-out hover:wr-ui-ease-in focus-visible:wr-ui-outline-none focus-visible:wr-ui-ring-2 focus-visible:wr-ui-ring-offset-2 disabled:wr-ui-pointer-events-none disabled:wr-ui-cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "wr-ui-bg-red-600 wr-ui-text-white wr-ui-transition-all wr-ui-duration-200 hover:wr-ui-bg-red-700 disabled:wr-ui-bg-red-950 disabled:wr-ui-text-zinc-500",
        secondary:
          "wr-ui-bg-zinc-800 wr-ui-text-zinc-100 hover:wr-ui-bg-zinc-700 disabled:wr-ui-bg-zinc-800 disabled:wr-ui-text-zinc-500",
        third:
          "wr-ui-bg-unity-white-15 wr-ui-font-semibold wr-ui-text-unity-white-50 wr-ui-backdrop-blur-md hover:wr-ui-bg-unity-white-50 hover:wr-ui-text-white disabled:wr-ui-bg-unity-white-5",
        outline:
          "wr-ui-border wr-ui-border-zinc-800 wr-ui-bg-transparent wr-ui-text-zinc-100 hover:wr-ui-bg-zinc-800 disabled:wr-ui-text-zinc-500",
        success:
          "wr-ui-bg-green-500 wr-ui-transition-all wr-ui-duration-200 hover:wr-ui-bg-green-600 disabled:wr-ui-bg-green-800 disabled:wr-ui-text-zinc-400 disabled:wr-ui-opacity-90",
        coinflip:
          // eslint-disable-next-line
          "wr-ui-bg-gradient-to-t wr-ui-from-unity-coinflip-purple-700 wr-ui-to-unity-coinflip-purple-400 bg-[size:wr-ui-_200%] bg-[position:wr-ui-_0%_0%] wr-ui-font-furore wr-ui-transition-all wr-ui-duration-300 hover:wr-ui-from-unity-coinflip-purple-400 hover:wr-ui-to-unity-coinflip-purple-700 hover:wr-ui-bg-[position",
        "horse-race":
          // eslint-disable-next-line
          "wr-ui-bg-horse-race-bet-button-bg bg-[size:wr-ui-100%] wr-ui-bg-no-repeat wr-ui-font-barlowCondensed wr-ui-text-[22px] wr-ui-font-[900] wr-ui-uppercase wr-ui-italic wr-ui-leading-8 wr-ui-tracking-wider wr-ui-transition-all wr-ui-duration-300 [text-shadow:wr-ui-_0px_2px_0px_#054352] hover:wr-ui-scale-110 hover:wr-ui-ease-in disabled:wr-ui-bg-horse-race-bet-button-bg-disabled md:wr-ui-bg-contain",
        crash:
          "bg-[#5B6CFF] transition-all duration-300 hover:bg-[#3C4DE1] disabled:bg-zinc-700",
        plinko:
          "!wr-ui-rounded-none wr-ui-bg-plinko-button bg-[size:wr-ui-100%] wr-ui-bg-no-repeat wr-ui-font-furore wr-ui-text-2xl wr-ui-leading-6 wr-ui-transition-all wr-ui-duration-300 [text-shadow:wr-ui-_0px_2px_0px_#054352] [box-shadow:wr-ui-0px_2.7px_0px_0px_#004265] hover:wr-ui-scale-110 hover:wr-ui-ease-in disabled:wr-ui-bg-plinko-button-disabled lg:wr-ui-bg-contain",
      },
      size: {
        sm: "wr-ui-h-7 wr-ui-rounded-sm",
        md: "wr-ui-h-9 wr-ui-rounded-md",
        lg: "wr-ui-h-10 wr-ui-rounded-md",
        xl: "wr-ui-h-12 wr-ui-rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  withIcon?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      withIcon = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "wr-ui-flex wr-ui-items-center wr-ui-gap-2": withIcon,
        })}
        ref={ref}
        {...props}
      >
        {isLoading ? <Spinner /> : props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
