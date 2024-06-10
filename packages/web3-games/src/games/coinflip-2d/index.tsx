"use client";

import {
  CoinFlipFormFields,
  CoinFlipGameResult,
  CoinFlipTemplate,
  CoinSide,
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
  CoinFlipSettledEvent,
  DecodedEvent,
  GAME_HUB_EVENT_TYPES,
  prepareGameTransaction,
} from "../utils";
import { useGameSocketContext } from "../hooks";

const selectedTokenAddress = process.env.NEXT_PUBLIC_WETH_ADDRESS || "";
const gameAddress = process.env.NEXT_PUBLIC_COIN_FLIP_ADDRESS || "";
const cashierAddress = process.env.NEXT_PUBLIC_CASHIER_ADDRESS || "";
const controllerAddress = process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS || "";
const uiOperatorAddress = process.env.NEXT_PUBLIC_UI_OPERATOR_ADDRESS || "";

export default function CoinFlipTemplateWithWeb3() {
  const [formValues, setFormValues] = useState<CoinFlipFormFields>({
    betCount: 1,
    coinSide: CoinSide.HEADS,
    stopGain: 0,
    stopLoss: 0,
    wager: 1,
  });

  const { gameEvent } = useGameSocketContext();

  const [coinFlipResult, setCoinFlipResult] =
    useState<DecodedEvent<any, CoinFlipSettledEvent>>();
  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress as Address,
    showDefaultToasts: false,
  });

  const coinFlipSteps = useMemo(() => {
    if (!coinFlipResult) return [];

    return coinFlipResult?.program?.[0]?.data.converted.steps.map((s) => ({
      coinSide: s.outcome,
      payout: s.payout,
      payoutInUsd: s.payout,
    })) as CoinFlipGameResult[];
  }, [coinFlipResult]);

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
      [Number(formValues.coinSide)]
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
    formValues.coinSide,
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

    const finalResult = gameEvent as DecodedEvent<any, CoinFlipSettledEvent>;

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.Settled)
      setCoinFlipResult(finalResult);
  }, [gameEvent]);

  return (
    <CoinFlipTemplate
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
      gameResults={coinFlipSteps}
      onFormChange={(val) => {
        setFormValues(val);
      }}
    />
  );
}
