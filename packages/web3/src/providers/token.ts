import { create } from "zustand";
import { Address } from "viem";

import { createJSONStorage, persist } from "zustand/middleware";

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
  selectedToken: Token;
}

interface TokenProviderActions {
  updateState: (state: Partial<TokenProviderProps>) => void;
  setSelectedToken: (token: Token) => void;
}

const defaultSelectedToken = {
  address: "0x" as Address,
  symbol: "",
  icon: "",
  decimals: 0,
  displayDecimals: 0,
  playable: false,
};

export type TokenProvider = TokenProviderProps & TokenProviderActions;

export const useTokenStore = create(
  persist<TokenProvider>(
    (set) => ({
      tokens: [],
      // TODO: should be a token address. how we can assure that the token is in the list and not has been changed?
      selectedToken: defaultSelectedToken,
      setSelectedToken: (token) => {
        set((prevState) => ({ ...prevState, selectedToken: token }));
      },
      updateState: (state: Partial<TokenProviderProps>) => {
        return set((prevState) => ({ ...prevState, ...state }));
      },
    }),
    {
      name: "token-store",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
