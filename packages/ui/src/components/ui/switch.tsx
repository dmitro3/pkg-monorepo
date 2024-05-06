"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    thumbClassName?: string;
  }
>(({ className, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "focus-visible:wr-ui-ring-offset-background data-[state=unchecked]:wr-ui-bg-input wr-ui-border-transparen focus-visible:wr-ui-ring-ring wr-ui-peer wr-ui-inline-flex wr-ui-h-[16px] wr-ui-w-[32px] wr-ui-shrink-0 wr-ui-cursor-pointer wr-ui-items-center wr-ui-rounded-full wr-ui-border-2 wr-ui-border-none wr-ui-bg-zinc-700 wr-ui-transition-colors data-[state=checked]:wr-ui-bg-red-600 focus-visible:wr-ui-outline-none focus-visible:wr-ui-ring-2 focus-visible:wr-ui-ring-offset-2 disabled:wr-ui-cursor-not-allowed disabled:wr-ui-opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "wr-ui-bg-background wr-ui-pointer-events-none -wr-ui-ml-[1px] wr-ui-block wr-ui-h-[16px] wr-ui-w-[16px] wr-ui-rounded-full wr-ui-border-2 wr-ui-bg-white wr-ui-shadow-lg wr-ui-ring-0 wr-ui-transition-transform data-[state=checked]:wr-ui-translate-x-5 data-[state=unchecked]:wr-ui-translate-x-0 data-[state=checked]:wr-ui-border-white",
        thumbClassName
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
