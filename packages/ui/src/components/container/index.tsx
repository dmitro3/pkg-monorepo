"use client";

import { cva, type VariantProps } from "class-variance-authority";

const container = cva(["mx-auto my-0"], {
  variants: {
    size: {
      small: ["max-w-lg"],
      medium: ["max-w-2xl"],
      modal: ["max-w-3xl"],
      large: ["max-w-[1140px]"],
      default: ["max-w-[1140px]"],
    },
  },
});

interface IContainerProps extends VariantProps<typeof container> {}

const Container: React.FC<
  IContainerProps & { children: React.ReactNode; className?: string }
> = ({ size, children, className }) => {
  return <div className={container({ size, className })}>{children}</div>;
};

export default Container;
