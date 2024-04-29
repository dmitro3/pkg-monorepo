"use client";

import { cn } from "@winrlabs/ui";
import React from "react";

export const LastBetsContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "absolute top-5 left-1/2 -translate-x-1/2 flex max-w-[350px] items-center justify-end gap-[6px] overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};
