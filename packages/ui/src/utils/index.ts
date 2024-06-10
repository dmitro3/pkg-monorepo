import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  prefix: "wr-",
});

export function cn(...inputs: ClassValue[]) {
  const modfiedInput = clsx(inputs);
  const mergedClasses = customTwMerge(modfiedInput);
  return mergedClasses;
}

export const toFormatted = (amount: number | string, decimals = 4): string => {
  if (typeof amount === "string") {
    amount = Number(amount);
  }

  amount = new Intl.NumberFormat("en", {
    maximumFractionDigits: decimals,
  }).format(amount);

  return amount;
};
