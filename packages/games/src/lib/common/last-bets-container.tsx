"use client";

import React from "react";
import { cn } from "../utils/style";

export const LastBetsContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "wr-absolute wr-top-5 wr-left-1/2 -wr-translate-x-1/2 wr-flex wr-max-w-[350px] wr-items-center wr-justify-end wr-gap-[6px] wr-overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};
