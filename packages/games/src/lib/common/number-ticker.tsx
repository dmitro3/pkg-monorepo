"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "../utils/style";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  onAnimationComplete,
  onAnimationStart,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 700,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(2)
        );
        if (latest == motionValue.get()) {
          onAnimationComplete?.();
        }
      }
    });
  }, [springValue]);

  useEffect(() => {
    onAnimationStart?.();
  }, [value]);

  return (
    <span
      className={cn("wr-inline-block wr-tabular-nums", className)}
      ref={ref}
    />
  );
}
