"use client";

import { KenoTemplateWithWeb3 } from "@winrlabs/web3-games";
import React from "react";

const KenoPage = () => {
  return <KenoTemplateWithWeb3 minWager={0.1} maxWager={2000} options={{}} />;
};

export default KenoPage;
