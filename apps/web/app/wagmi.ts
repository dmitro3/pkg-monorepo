import { http, createConfig, Config } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), coinbaseWallet({ appName: "Create Wagmi" })],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
}) as Config;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
