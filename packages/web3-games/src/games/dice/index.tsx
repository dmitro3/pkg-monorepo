"use client";

import { DiceFormFields, DiceGameResult, DiceTemplate } from "@winrlabs/games";
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

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

interface TemplateWithWeb3Props {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;

  onAnimationStep?: (step: number) => void;
  onAnimationCompleted?: (result: DiceGameResult[]) => void;
  onAnimationSkipped?: (result: DiceGameResult[]) => void;
}

export default function DiceTemplateWithWeb3(props: TemplateWithWeb3Props) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
  } = useContractConfigContext();

  const [formValues, setFormValues] = useState<DiceFormFields>({
    betCount: 1,
    stopGain: 0,
    stopLoss: 0,
    wager: 1,
    rollValue: 50,
    rollType: "OVER",
    winChance: 50,
  });

  const { gameEvent } = useGameSocketContext<any, SingleStepSettledEvent>();

  const [diceResult, setDiceResult] =
    useState<DecodedEvent<any, SingleStepSettledEvent>>();
  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const diceSteps = useMemo(() => {
    if (!diceResult) return [];

    return diceResult?.program?.[0]?.data.converted.steps.map((s) => ({
      resultNumber: s.outcome / 100,
      payout: s.payout,
      payoutInUsd: s.payout,
    }));
  }, [diceResult]);

  const encodedParams = useMemo(() => {
    const { tokenAddress, wagerInWei, stopGainInWei, stopLossInWei } =
      prepareGameTransaction({
        wager: formValues.wager,
        stopGain: formValues.stopGain,
        stopLoss: formValues.stopLoss,
        selectedCurrency: selectedTokenAddress,
        lastPrice: 1,
      });

    const encodedChoice = encodeAbiParameters(
      [
        {
          name: "choice",
          type: "uint16",
        },
        {
          name: "over",
          type: "bool",
        },
      ],
      [
        Number(formValues.rollValue * 100),
        formValues.rollType == "OVER" ? true : false,
      ]
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
        formValues.betCount,
        encodedChoice,
      ]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.dice as Address,
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
  }, [formValues]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.dice as Address,
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

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.Settled)
      setDiceResult(finalResult);
  }, [gameEvent]);

  return (
    <DiceTemplate
      {...props}
      onSubmitGameForm={onGameSubmit}
      gameResults={diceSteps}
      onFormChange={(val) => {
        setFormValues(val);
      }}
    />
  );
}
