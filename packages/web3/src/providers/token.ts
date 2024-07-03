import { create } from "zustand";
import { Address } from "viem";

export interface Token {
  address: Address;
  symbol: string;
  icon: string;
  decimals: number;
  displayDecimals: number;
  playable: boolean;
}

interface TokenProviderProps {
  tokens: Token[];
  selectedTokenAddress?: Address;
}

interface TokenProviderActions {
  setSelectedTokenAddress: (tokenAddress: Address) => void;
  updateState: (state: Partial<TokenProviderProps>) => void;
}

export type TokenProvider = TokenProviderProps & TokenProviderActions;

export const useTokenStore = create<TokenProvider>((set) => ({
  tokens: [],
  selectedToken: undefined,
  setSelectedTokenAddress: (tokenAddress: Address) => {
    return set((state) => ({
      ...state,
      selectedTokenAddress: tokenAddress,
    }));
  },
  updateState: (state: Partial<TokenProviderProps>) => {
    return set((prevState) => ({ ...prevState, ...state }));
  },
}));

export const useSelectedToken = () => {
  const { selectedTokenAddress, tokens } = useTokenStore();

  const selectedToken = tokens.find(
    (token) => token.address === selectedTokenAddress,
  );

  return selectedToken!;
};
