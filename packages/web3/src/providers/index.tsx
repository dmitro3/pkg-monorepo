import { BundlerClientProvider } from "../hooks/use-bundler-client";
import { CurrentAccountProvider } from "../hooks/use-current-address";
import { SmartAccountApiProvider } from "../hooks/use-smart-account-api";

export const WinrLabsWeb3Provider = ({
  children,
  smartAccountConfig,
}: {
  children: React.ReactNode;
  smartAccountConfig: {
    bundlerUrl: string;
    entryPointAddress: `0x${string}`;
    factoryAddress: `0x${string}`;
  };
}) => {
  return (
    <BundlerClientProvider rpcUrl={smartAccountConfig.bundlerUrl}>
      <SmartAccountApiProvider
        entryPointAddress={smartAccountConfig.entryPointAddress}
        factoryAddress={smartAccountConfig.factoryAddress}
      >
        <CurrentAccountProvider>{children}</CurrentAccountProvider>
      </SmartAccountApiProvider>
    </BundlerClientProvider>
  );
};
