"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex h-2 items-center justify-center rounded-md px-3 py-0 text-[15px] font-semibold leading-4  transition duration-300 ease-out hover:ease-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-red-600 text-white transition-all duration-200 hover:bg-red-700 disabled:bg-red-950 disabled:text-zinc-500",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500",
        third:
          "bg-unity-white-15 font-semibold text-unity-white-50 backdrop-blur-md hover:bg-unity-white-50 hover:text-white disabled:bg-unity-white-5",
        outline:
          "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-800 disabled:text-zinc-500",
        success:
          "bg-green-500 transition-all duration-200 hover:bg-green-600 disabled:bg-green-800 disabled:text-zinc-400 disabled:opacity-90",
        coinflip:
          // eslint-disable-next-line
          "bg-gradient-to-t from-unity-coinflip-purple-700 to-unity-coinflip-purple-400 bg-[size:_200%] bg-[position:_0%_0%] font-furore transition-all duration-300 hover:from-unity-coinflip-purple-400 hover:to-unity-coinflip-purple-700 hover:bg-[position:_100%_100%]",
        "horse-race":
          // eslint-disable-next-line
          "bg-horse-race-bet-button-bg bg-[size:100%] bg-no-repeat font-barlowCondensed text-[22px] font-[900] uppercase italic leading-8 tracking-wider transition-all duration-300 [text-shadow:_0px_2px_0px_#054352] hover:scale-110 hover:ease-in disabled:bg-horse-race-bet-button-bg-disabled md:bg-contain",
        crash:
          "bg-[#5B6CFF] transition-all duration-300 hover:bg-[#3C4DE1] disabled:bg-zinc-700",
        plinko:
          "!rounded-none bg-plinko-button bg-[size:100%] bg-no-repeat font-furore text-2xl leading-6 transition-all duration-300 [text-shadow:_0px_2px_0px_#054352] [box-shadow:0px_2.7px_0px_0px_#004265] hover:scale-110 hover:ease-in disabled:bg-plinko-button-disabled lg:bg-contain",
      },
      size: {
        sm: "h-7 rounded-sm",
        md: "h-9 rounded-md",
        lg: "h-10 rounded-md",
        xl: "h-12 rounded-lg",
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
          "flex items-center gap-2": withIcon,
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
