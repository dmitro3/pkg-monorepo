"use client";

import {
  CoinFlipFormFields,
  CoinFlipGameResult,
  CoinFlipTemplate,
  CoinSide,
  useGameNotifications,
} from "@winrlabs/games";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  usePriceFeed,
  useTokenAllowance,
  useTokenBalances,
  useTokenStore,
} from "@winrlabs/web3";
import React, { useMemo, useState } from "react";
import { Address, encodeAbiParameters, encodeFunctionData } from "viem";

import { useContractConfigContext } from "../hooks/use-contract-config";
import { useListenGameEvent } from "../hooks/use-listen-game-event";
import {
  DecodedEvent,
  GAME_HUB_EVENT_TYPES,
  prepareGameTransaction,
  SingleStepSettledEvent,
} from "../utils";

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
  onAnimationCompleted?: (result: CoinFlipGameResult[]) => void;
  onAnimationSkipped?: (result: CoinFlipGameResult[]) => void;
}

export default function CoinFlipGame(props: TemplateWithWeb3Props) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
  } = useContractConfigContext();
  const {
    updateResultSummary,
    updatePlayedNotifications,
    clearResultSummary,
    clearPlayedNotifications,
    skipNotifications,
  } = useGameNotifications([
    "updateResultSummary",
    "updatePlayedNotifications",
    "clearResultSummary",
    "skipNotifications",
    "clearPlayedNotifications",
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState<CoinFlipFormFields>({
    betCount: 1,
    coinSide: CoinSide.HEADS,
    stopGain: 0,
    stopLoss: 0,
    wager: props.minWager || 1,
  });

  const gameEvent = useListenGameEvent();

  const { selectedToken } = useTokenStore((s) => ({
    selectedToken: s.selectedToken,
  }));

  const { priceFeed, getPrice } = usePriceFeed();

  const [coinFlipResult, setCoinFlipResult] =
    useState<DecodedEvent<any, SingleStepSettledEvent>>();
  const currentAccount = useCurrentAccount();
  const { refetch: updateBalances } = useTokenBalances({
    account: currentAccount.address || "0x",
  });

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedToken.address,
    showDefaultToasts: false,
  });

  const coinFlipSteps = useMemo(() => {
    if (!coinFlipResult) return [];

    return coinFlipResult?.program?.[0]?.data.converted.steps.map((s) => ({
      coinSide: s.outcome,
      payout: s.payout,
      payoutInUsd: s.payout,
    }));
  }, [coinFlipResult]);

  const encodedParams = useMemo(() => {
    const { tokenAddress, wagerInWei, stopGainInWei, stopLossInWei } =
      prepareGameTransaction({
        wager: formValues.wager,
        stopGain: formValues.stopGain,
        stopLoss: formValues.stopLoss,
        selectedCurrency: selectedToken,
        lastPrice: getPrice(selectedToken.address),
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
        gameAddresses.coinFlip as Address,
        selectedToken.bankrollIndex,
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
    selectedToken.address,
    priceFeed[selectedToken.address],
  ]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.coinFlip,
        selectedToken.bankrollIndex,
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
    clearResultSummary();
    clearPlayedNotifications();

    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }
    setIsLoading(true); // Set loading state to true

    try {
      await handleTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  React.useEffect(() => {
    const finalResult = gameEvent;

    if (finalResult?.program[0]?.type === GAME_HUB_EVENT_TYPES.Settled) {
      setCoinFlipResult(finalResult);
      updateResultSummary({
        wagerWithMultiplier: formValues.wager,
        currency: selectedToken,
        playedGameCount: formValues.betCount || 0,
      });
      setIsLoading(false);
    }
  }, [gameEvent]);

  const onGameCompleted = (result: CoinFlipGameResult[]) => {
    props.onAnimationCompleted && props.onAnimationCompleted(result);
    updateBalances();
  };

  const onAnimationStep = React.useCallback(
    (step: number) => {
      props.onAnimationStep && props.onAnimationStep(step);

      const currentStepResult =
        coinFlipResult?.program?.[0]?.data.converted.steps[step - 1];

      if (!currentStepResult) return;

      const isWon = currentStepResult.payout > 0;

      updatePlayedNotifications({
        component: <></>,
        duration: 5000,
        order: step,
        payoutInUsd: currentStepResult.payout,
        won: isWon,
        wagerInUsd: formValues.wager,
      });
    },
    [coinFlipResult]
  );

  const onAnimationSkipped = React.useCallback(
    (result: CoinFlipGameResult[]) => {
      const steps = coinFlipResult?.program?.[0]?.data.converted.steps;

      if (!steps) return;

      const lastFiveResults = result.slice(Math.max(steps.length - 5, 0));

      skipNotifications({
        playedNotifications: lastFiveResults.map((result, idx) => ({
          order: Math.max(formValues.betCount || 5, 5) - 5 + idx + 1,
          payoutInUsd: result.payoutInUsd || 0,
          won: (result.payout || 0) > 0,
          wagerInUsd: formValues.wager || 0,
          component: <></>,
          duration: 4700,
        })),
        resultSummary: {
          currentProfit:
            Number(
              coinFlipResult?.program?.[0]?.data.converted.payout?.toFixed(2)
            ) || 0,
          currentOrder: 0,
          wonCount: steps.filter((result) => result.payout > 0).length,
          lossCount: steps.filter((result) => result.payout === 0).length,
          playedGameCount: formValues.betCount || 0,
          wagerWithMultiplier: formValues.wager || 0,
        },
      });
    },
    [coinFlipResult]
  );

  return (
    <CoinFlipTemplate
      {...props}
      isGettingResult={isLoading}
      onSubmitGameForm={onGameSubmit}
      gameResults={coinFlipSteps || []}
      onAnimationCompleted={onGameCompleted}
      onAnimationStep={onAnimationStep}
      onFormChange={(val) => {
        setFormValues(val);
      }}
      onAnimationSkipped={onAnimationSkipped}
    />
  );
}
