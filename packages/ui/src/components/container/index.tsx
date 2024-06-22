"use client";

import { cva, type VariantProps } from "class-variance-authority";

const container = cva(["wr-mx-auto wr-my-0"], {
  variants: {
    size: {
      small: ["wr-max-w-lg"],
      medium: ["wr-max-w-2xl"],
      modal: ["wr-max-w-3xl"],
      large: ["wr-max-w-[1140px]"],
      default: ["wr-max-w-[1140px]"],
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
