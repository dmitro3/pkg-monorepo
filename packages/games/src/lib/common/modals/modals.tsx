"use client";

import React from "react";

import { useWeb3GamesModalsStore } from "./modals.store";
import { RefundModal } from "./refund";

const Web3GamesModalsTemplate = () => {
  const { modal, props } = useWeb3GamesModalsStore();

  const currentModal = React.useMemo(() => {
    switch (modal) {
      case "refund":
        return <RefundModal {...props?.refund} />;
      default:
        return <></>;
    }
  }, [modal]);

  return <>{currentModal}</>;
};

export default Web3GamesModalsTemplate;
