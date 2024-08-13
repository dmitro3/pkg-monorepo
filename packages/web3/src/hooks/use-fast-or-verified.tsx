"use client";

import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum FastOrVerifiedOption {
  FAST = "fast",
  VERIFIED = "verified",
}

export enum EventLogic {
  PSEUDO = "pseudo",
  ONCHAIN = "onchain",
}

const eventLogicMap = {
  [FastOrVerifiedOption.FAST]: EventLogic.PSEUDO,
  [FastOrVerifiedOption.VERIFIED]: EventLogic.ONCHAIN,
};

interface FastOrVerifiedState {
  option: FastOrVerifiedOption;
  updateOption: (option: FastOrVerifiedOption) => void;
}

export const useFastOrVerifiedStore = create<FastOrVerifiedState>()(
  persist(
    (set) => ({
      option: FastOrVerifiedOption.FAST,
      updateOption: (option: FastOrVerifiedOption) => set({ option }),
    }),
    {
      name: "fast-or-verified-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useFastOrVerified = () => {
  const { option } = useFastOrVerifiedStore();

  const eventLogic = React.useMemo(() => eventLogicMap[option], [option]);

  return {
    option,
    eventLogic,
  };
};
