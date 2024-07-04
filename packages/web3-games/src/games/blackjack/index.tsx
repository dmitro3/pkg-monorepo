"use client";

import { useContractConfigContext } from "../hooks/use-contract-config";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

interface TemplateWithWeb3Props {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
}

export default function BlackjackTemplateWithWeb3(
  props: TemplateWithWeb3Props
) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
    selectedTokenAddress,
  } = useContractConfigContext();

  return <></>;
}
