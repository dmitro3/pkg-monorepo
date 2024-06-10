"use client";

import { createContext, useContext } from "react";
import { Config } from "wagmi";

const WagmiConfigContext = createContext<{ wagmiConfig?: Config }>({
  wagmiConfig: undefined,
});

export const useWagmiConfig = () => {
  const context = useContext(WagmiConfigContext);

  return context;
};

export interface WagmiConfigProviderProps {
  wagmiConfig: Config;
  children: React.ReactNode;
}

export const WagmiConfigProvider = ({
  children,
  wagmiConfig,
}: WagmiConfigProviderProps) => {
  return (
    <WagmiConfigContext.Provider
      value={{
        wagmiConfig,
      }}
    >
      {children}
    </WagmiConfigContext.Provider>
  );
};
