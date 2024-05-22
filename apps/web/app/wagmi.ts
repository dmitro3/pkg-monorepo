import { SmartWalletConnectors } from "@winrlabs/web3";
import { http, createConfig, Config } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const smartWalletConnectors = new SmartWalletConnectors({
  chains: [arbitrumSepolia],
  loginProviders: ["google", "weibo", "twitter"],
  web3AuthOptions: {
    clientId:
      "BOnGGGODOCSliYrz-EcFgQE2vzu-XZzkSQNuonHhDfwjzA2sufZKQ9sULLp3Of9qJPKF6NlSiTM5pWMMm3ftMqU",
    web3AuthNetwork: "testnet",
  },
  openLoginOptions: {
    adapterSettings: {
      uxMode: "popup",
      network: "testnet",
      clientId:
        "BOnGGGODOCSliYrz-EcFgQE2vzu-XZzkSQNuonHhDfwjzA2sufZKQ9sULLp3Of9qJPKF6NlSiTM5pWMMm3ftMqU",
      whiteLabel: {
        appName: "JIB",
        appUrl: "https://justbet-aa.vercel.app/",
        logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
        defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
        theme: {
          primary: "#00B4FF",
        },
      },
    },
  },
});

export const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    ...smartWalletConnectors.connectors.map(({ connector }) => connector),
  ],

  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http(),
  },
}) as Config;
