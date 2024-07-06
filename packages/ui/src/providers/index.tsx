import { Config } from "wagmi";
import { WagmiConfigProvider } from "./wagmi-config";
import { AppConfigProvider } from "./app-config";

export const AppUiProviders = ({
  children,
  wagmiConfig,
}: {
  children?: React.ReactNode;
  wagmiConfig: Config;
}) => {
  return (
    <AppConfigProvider>
      <WagmiConfigProvider wagmiConfig={wagmiConfig}>
        {children}
      </WagmiConfigProvider>
    </AppConfigProvider>
  );
};
