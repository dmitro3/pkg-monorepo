import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  prefix: 'wr-',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
