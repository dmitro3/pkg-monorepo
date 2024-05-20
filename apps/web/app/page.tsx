"use client";

import { useAccount, useDisconnect } from "wagmi";

import { Code, useWinrConnect } from "@winrlabs/web3";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useWinrConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          <br />
          <Code>Hello</Code>
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
