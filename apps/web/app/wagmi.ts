import { AccountAbstractionConnector } from "@winrlabs/web3";
import { http, createConfig, Config } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const accountAbstractionConnectors = new AccountAbstractionConnector({
  chains: [mainnet, sepolia],
  loginProviders: ["google", "weibo", "twitter"],
  web3AuthOptions: {
    clientId:
      "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
  },
  openLoginOptions: {
    adapterSettings: {
      uxMode: "popup",
    },
  },
});

/* const connectors = accountAbstractionConnector.getConnectors([
  "google",
  "weibo",
  "twitter",
]); */

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    ...accountAbstractionConnectors.aaConnectors.map(
      (aaConnector) => aaConnector.connector
    ),
  ],

  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
}) as Config;
