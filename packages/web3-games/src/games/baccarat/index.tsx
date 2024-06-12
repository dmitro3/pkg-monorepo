"use client";

import {
  BaccaratFormFields,
  BaccaratGameSettledResult,
  BaccaratTemplate,
} from "@winrlabs/games";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  useTokenAllowance,
} from "@winrlabs/web3";
import React, { useMemo, useState } from "react";
import { Address, encodeAbiParameters, encodeFunctionData } from "viem";
import {
  DecodedEvent,
  GAME_HUB_EVENT_TYPES,
  SingleStepSettledEvent,
  prepareGameTransaction,
} from "../utils";
import { useGameSocketContext } from "../hooks";
import { useContractConfigContext } from "../hooks/use-contract-config";

const selectedTokenAddress = (process.env.NEXT_PUBLIC_WETH_ADDRESS ||
  "0x0") as `0x${string}`;

interface TemplateWithWeb3Props {
  minWager?: number;
  maxWager?: number;

  onAnimationCompleted?: (result: BaccaratGameSettledResult) => void;
}

export default function BaccaratTemplateWithWeb3(props: TemplateWithWeb3Props) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
  } = useContractConfigContext();

  const [formValues, setFormValues] = useState<BaccaratFormFields>({
    playerWager: 0,
    bankerWager: 0,
    tieWager: 0,
  });

  const { gameEvent } = useGameSocketContext<any, SingleStepSettledEvent>();

  const [baccaratResults, setBaccaratResults] =
    useState<DecodedEvent<any, any>>();
  const [baccaratSettledResult, setBaccaratSettledResult] =
    React.useState<DecodedEvent<any, any>>();

  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const encodedParams = useMemo(() => {
    const { tokenAddress, wagerInWei, stopGainInWei, stopLossInWei } =
      prepareGameTransaction({
        wager: 1,
        stopGain: 0,
        stopLoss: 0,
        selectedCurrency: selectedTokenAddress,
        lastPrice: 1,
      });

    const encodedChoice = encodeAbiParameters(
      [
        {
          name: "tieWins",
          type: "uint16",
        },
        {
          name: "bankWins",
          type: "uint16",
        },
        {
          name: "playerWins",
          type: "uint16",
        },
      ],
      [formValues.tieWager, formValues.bankerWager, formValues.playerWager]
    );

    const encodedGameData = encodeAbiParameters(
      [
        { name: "wager", type: "uint128" },
        { name: "stopGain", type: "uint128" },
        { name: "stopLoss", type: "uint128" },
        { name: "count", type: "uint8" },
        { name: "data", type: "bytes" },
      ],
      [
        wagerInWei,
        stopGainInWei as bigint,
        stopLossInWei as bigint,
        1,
        encodedChoice,
      ]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.baccarat as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "bet",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.bankerWager, formValues.playerWager, formValues.tieWager]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.baccarat,
        encodedParams.tokenAddress,
        uiOperatorAddress as Address,
        "bet",
        encodedParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedParams.encodedTxData,
  });

  const onGameSubmit = async () => {
    console.log("SUBMITTING!");
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    try {
      await handleTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
    }
  };

  React.useEffect(() => {
    const finalResult = gameEvent;

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.Settled) {
      console.log(finalResult, "settled");
    }

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.HandFinalized) {
      console.log(finalResult, "hand finalized");
    }
  }, [gameEvent]);

  return (
    <BaccaratTemplate
      {...props}
      onSubmitGameForm={onGameSubmit}
      baccaratResults={null}
      baccaratSettledResults={null}
      onFormChange={(val) => {
        setFormValues(val);
      }}
    />
  );
}
