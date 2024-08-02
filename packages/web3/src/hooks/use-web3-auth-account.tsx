import { useMemo } from "react";
import { Connectors } from "../config/smart-wallet-connectors";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";

interface UseWeb3AuthAccountParams {
  smartWalletConnectors: Connectors[];
  currentConnectorName: string;
}

export const useWeb3AuthAccount = ({
  smartWalletConnectors,
  currentConnectorName,
}: UseWeb3AuthAccountParams): UseQueryResult<
  Partial<OpenloginUserInfo> | undefined,
  Error
> => {
  const currentConnector = smartWalletConnectors.find(
    (c) => c.loginProvider === currentConnectorName
  );

  return useQuery({
    queryKey: ["web3-auth-account", currentConnectorName],
    queryFn: async () => {
      return await currentConnector?.web3AuthInstance.getUserInfo();
    },
    enabled: !!currentConnector,
  });
};
