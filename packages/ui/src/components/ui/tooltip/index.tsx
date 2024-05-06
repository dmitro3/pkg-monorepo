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
      "wr-ui-z-50 wr-ui-overflow-hidden wr-ui-rounded-md wr-ui-border wr-ui-border-zinc-800 wr-ui-bg-zinc-900 wr-ui-px-3 wr-ui-py-1.5 wr-ui-text-sm wr-ui-text-white wr-ui-shadow-md wr-ui-animate-in wr-ui-fade-in-0 wr-ui-zoom-in-95 wr-ui-data-[state=closed]:animate-out wr-ui-data-[state=closed]:fade-out-0 wr-ui-data-[state=closed]:zoom-out-95 wr-ui-data-[side=bottom]:slide-in-from-top-2 wr-ui-data-[side=left]:slide-in-from-right-2 wr-ui-data-[side=right]:slide-in-from-left-2 wr-ui-data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
