// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  UX_MODE,
  IWeb3AuthCoreOptions,
} from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import {
  CUSTOM_LOGIN_PROVIDER_TYPE,
  LOGIN_PROVIDER_TYPE,
  OpenloginAdapter,
  OpenloginAdapterOptions,
} from "@web3auth/openlogin-adapter";

interface Web3AuthConnectorInstanceParams {
  chains: Chain[];
  loginProvider: LOGIN_PROVIDER_TYPE | CUSTOM_LOGIN_PROVIDER_TYPE;
  web3AuthOptions: IWeb3AuthCoreOptions;
  openLoginOptions: OpenloginAdapterOptions;
}

export function Web3AuthConnectorInstance({
  chains,
  loginProvider,
  web3AuthOptions,
  openLoginOptions,
}: Web3AuthConnectorInstanceParams): ReturnType<typeof Web3AuthConnector> {
  // Create Web3Auth Instance
  const name = "My App Name";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains?.[0]?.id.toString(16),
    rpcTarget: chains?.[0]?.rpcUrls.default.http[0] || "", // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains?.[0]?.name,
    tickerName: chains?.[0]?.nativeCurrency?.name,
    ticker: chains?.[0]?.nativeCurrency?.symbol,
    blockExplorerUrl: chains?.[0]?.blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthInstance = new Web3AuthNoModal({
    /* clientId:
      "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ", */
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      appName: name,
      defaultLanguage: "en",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      mode: "light",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    enableLogging: true,
    ...web3AuthOptions,
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      uxMode: UX_MODE.POPUP,
    },
    ...openLoginOptions,
  });

  web3AuthInstance.configureAdapter(openloginAdapter);

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: false,
      },
    },
  });
  web3AuthInstance.addPlugin(walletServicesPlugin);

  return Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider,
    },
  });
}
