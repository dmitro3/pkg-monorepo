import { BundlerClientProvider } from "../hooks/use-bundler-client";
import { CurrentAccountProvider } from "../hooks/use-current-address";

export const WinrLabsWeb3Provider = ({
  children,
  rpcUrl,
}: {
  children: React.ReactNode;
  rpcUrl: string;
}) => {
  return (
    <BundlerClientProvider rpcUrl={rpcUrl}>
      <CurrentAccountProvider>{children}</CurrentAccountProvider>
    </BundlerClientProvider>
  );
};
