"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useCurrentAccount } from "@winrlabs/web3";
import React from "react";
import { smartWalletConnectors } from "./wagmi";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const currentAA = useCurrentAccount();

/*   const currentConnector = smartWalletConnectors.connectors.find(
    (c) => c.loginProvider === account.connector?.name
  );

  console.log("hey", currentConnector?.web3AuthInstance.getUserInfo());

  React.useEffect(() => {
    if (!currentConnector) return;

    const getUserInfo = async () => {
      const res = await currentConnector?.web3AuthInstance?.getUserInfo();

      console.log("res", res);
    };

    getUserInfo();  
  }, [currentConnector]); */

  return <></>;
}

export default App;
