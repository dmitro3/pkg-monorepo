"use client";

import { create, SetState } from "zustand";

import { Web3GamesModalsStore, Web3GamesModalsStoreActions } from "./types";

const actions = (
  set: SetState<Web3GamesModalsStore>
): Web3GamesModalsStoreActions => ({
  openModal: (modal, props) =>
    set((state) => ({ ...state, modal: modal, props })),
  closeModal: () =>
    set((state) => ({
      ...state,
      modal: undefined,
    })),
});

const state = {
  modal: undefined,
};

const modalsStore = (set: SetState<Web3GamesModalsStore>) => ({
  ...state,
  ...actions(set),
});

export const useWeb3GamesModalsStore =
  create<Web3GamesModalsStore>(modalsStore);
