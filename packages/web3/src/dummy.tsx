"use client";

import { useAccount } from "wagmi";

export function Dummy({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  const account = useAccount();

  return (
    <code className={className}>
      addresses: {JSON.stringify(account.addresses)}
      It can take children: {children}
    </code>
  );
}
