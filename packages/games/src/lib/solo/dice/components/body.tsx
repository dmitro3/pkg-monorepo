import { ComponentProps } from 'react';

export const Body = ({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<'div'>) => (
  <div className="wr-w-full lg:wr-pt-[72px]" {...props}>
    {children}
  </div>
);
