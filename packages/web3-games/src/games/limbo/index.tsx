"use client";

import {
  LimboFormField,
  LimboGameResult,
  LimboTemplate,
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
  LimboSettledEvent,
  prepareGameTransaction,
} from "../utils";
import { useGameSocketContext } from "../hooks";

const selectedTokenAddress = process.env.NEXT_PUBLIC_WETH_ADDRESS || "";
const gameAddress = process.env.NEXT_PUBLIC_LIMBO_ADDRESS || "";
const cashierAddress = process.env.NEXT_PUBLIC_CASHIER_ADDRESS || "";
const controllerAddress = process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS || "";
const uiOperatorAddress = process.env.NEXT_PUBLIC_UI_OPERATOR_ADDRESS || "";

export default function LimboTemplateWithWeb3() {
  const [formValues, setFormValues] = useState<LimboFormField>({
    betCount: 1,
    limboMultiplier: 1,
    stopGain: 0,
    stopLoss: 0,
    wager: 1,
  });

  const { gameEvent } = useGameSocketContext();

  const [limboResult, setLimboResult] =
    useState<DecodedEvent<any, LimboSettledEvent>>();
  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress as Address,
    showDefaultToasts: false,
  });

  const limboSteps = useMemo(() => {
    if (!limboResult) return [];

    return limboResult?.program?.[0]?.data.converted.steps.map((s) => ({
      number: s.outcome,
      payout: s.payout,
      payoutInUsd: s.payout,
    })) as LimboGameResult[];
  }, [limboResult]);

  const encodedParams = useMemo(() => {
    const { tokenAddress, wagerInWei, stopGainInWei, stopLossInWei } =
      prepareGameTransaction({
        wager: formValues.wager,
        stopGain: formValues.stopGain,
        stopLoss: formValues.stopLoss,
        selectedCurrency: selectedTokenAddress as Address,
        lastPrice: 1,
      });

    const encodedChoice = encodeAbiParameters(
      [
        {
          name: "data",
          type: "uint8",
        },
      ],
      [Number(formValues.limboMultiplier * 100)]
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
        gameAddress as Address,
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
  }, [
    formValues.betCount,
    formValues.limboMultiplier,
    formValues.stopGain,
    formValues.stopLoss,
    formValues.wager,
  ]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddress as Address,
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
    console.log(gameEvent, "gamevent");

    const finalResult = gameEvent as DecodedEvent<any, LimboSettledEvent>;

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.Settled)
      setLimboResult(finalResult);
  }, [gameEvent]);

  return (
    <LimboTemplate
      maxWager={100}
      minWager={1}
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      onSubmitGameForm={onGameSubmit}
      onAnimationStep={(e) => {
        console.log("STEP", e);
      }}
      onAnimationCompleted={() => {
        console.log("game completed");
      }}
      onAnimationSkipped={() => {
        console.log("game skipped");
      }}
      gameResults={limboSteps}
      onFormChange={(val) => {
        setFormValues(val);
      }}
    />
  );
}
