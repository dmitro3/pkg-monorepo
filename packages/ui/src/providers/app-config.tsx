import { createContext, useContext } from "react";

export interface AppTokens {
  tokenAddress: `0x${string}`;
  tokenSymbol: string;
  icon: string;
  tokenDecimals: number;
  displayDecimals: number;
}

const AppConfigContext = createContext({
  appTokens: [] as AppTokens[],
});

export const useAppConfig = () => {
  const appConfig = useContext(AppConfigContext);
  return appConfig;
};

export const AppConfigProvider = ({
  children,
  appTokens,
}: {
  children: React.ReactNode;
  appTokens: AppTokens[];
}) => {
  return (
    <AppConfigContext.Provider value={{ appTokens }}>
      {children}
    </AppConfigContext.Provider>
  );
};
