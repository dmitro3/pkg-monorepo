"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useCurrentAccount } from "@winrlabs/web3";
import React from "react";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const currentAA = useCurrentAccount();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          currentAA: {currentAA.readerAddress}
          <br />
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {connectors.map((connector) => {
            return (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name} - {connector.id}
              </button>
            );
          })}
        </section>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
