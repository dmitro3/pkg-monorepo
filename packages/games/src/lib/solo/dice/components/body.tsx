import { ComponentProps } from "react";

export const Body = ({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<"div">) => (
  <div className="w-full lg:pt-[72px]" {...props}>
    {children}
  </div>
);
