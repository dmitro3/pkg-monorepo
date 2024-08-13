import { ComponentProps } from 'react';

export const Body = ({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<'div'>) => (
  <div className="wr-w-full wr-h-full" {...props}>
    {children}
  </div>
);
