"use client";

import { useAccount, useBlock } from "wagmi";

export function Code({
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
