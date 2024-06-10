"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useCurrentAccount } from "@winrlabs/web3";
import React from "react";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const currentAA = useCurrentAccount();

  return <></>;
}

export default App;
