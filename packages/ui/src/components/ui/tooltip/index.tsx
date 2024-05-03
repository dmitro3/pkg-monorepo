"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "wr-z-50 wr-overflow-hidden wr-rounded-md wr-border wr-border-zinc-800 wr-bg-zinc-900 wr-px-3 wr-py-1.5 wr-text-sm wr-text-white wr-shadow-md wr-animate-in wr-fade-in-0 wr-zoom-in-95 wr-data-[state=closed]:animate-out wr-data-[state=closed]:fade-out-0 wr-data-[state=closed]:zoom-out-95 wr-data-[side=bottom]:slide-in-from-top-2 wr-data-[side=left]:slide-in-from-right-2 wr-data-[side=right]:slide-in-from-left-2 wr-data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
