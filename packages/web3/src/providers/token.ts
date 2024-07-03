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
  // TODO: imo this should be a token address.
  selectedToken?: Token;
}

interface TokenProviderActions {
  updateState: (state: Partial<TokenProviderProps>) => void;
  setSelectedToken: (token: Token) => void;
}

export type TokenProvider = TokenProviderProps & TokenProviderActions;

export const useTokenStore = create<TokenProvider>((set) => ({
  tokens: [],
  // TODO: should be a token address. how we can assure that the token is in the list and not has been changed?
  selectedToken: undefined,
  setSelectedToken: (token) => {
    set((prevState) => ({ ...prevState, selectedToken: token }));
  },
  updateState: (state: Partial<TokenProviderProps>) => {
    return set((prevState) => ({ ...prevState, ...state }));
  },
}));
