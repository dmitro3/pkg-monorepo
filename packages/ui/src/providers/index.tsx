import { Config } from "wagmi";
import { WagmiConfigProvider } from "./wagmi-config";
import { AppConfigProvider, AppTokens } from "./app-config";

export const AppUiProviders = ({
  children,
  wagmiConfig,
  appTokens,
}: {
  children?: React.ReactNode;
  wagmiConfig: Config;
  appTokens: AppTokens[];
}) => {
  return (
    <AppConfigProvider appTokens={appTokens}>
      <WagmiConfigProvider wagmiConfig={wagmiConfig}>
        {children}
      </WagmiConfigProvider>
    </AppConfigProvider>
  );
};
