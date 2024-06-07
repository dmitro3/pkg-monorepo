"use client";

import {
  CoinFlipFormFields,
  CoinFlipGameResult,
  CoinFlipTemplate,
  CoinSide,
  toDecimals,
} from "@winrlabs/games";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  useTokenAllowance,
} from "@winrlabs/web3";
import { useMemo, useState } from "react";
import { encodeAbiParameters, encodeFunctionData, parseUnits } from "viem";
import {
  CoinFlipSettledEvent,
  DecodedEvent,
  GAME_HUB_EVENT_TYPES,
  getGameHubEventV2,
} from "../../utils";

interface PrepareGameTransactionResult {
  wagerInWei: bigint;
  tokenAddress: `0x${string}`;
  stopGainInWei?: bigint;
  stopLossInWei?: bigint;
}

interface PrepareGameTransactionParams {
  wager: number;
  lastPrice: number;
  selectedCurrency: `0x${string}`;
  stopGain?: number;
  stopLoss?: number;
}

export const prepareGameTransaction = (
  params: PrepareGameTransactionParams
): PrepareGameTransactionResult => {
  const {
    lastPrice,
    wager,
    selectedCurrency,
    stopGain = 0,
    stopLoss = 0,
  } = params;

  const wagerInGameCurrency = toDecimals(
    (wager / lastPrice).toString(),
    6
  ).toString();

  const stopGainInGameCurrency = toDecimals(
    (stopGain / lastPrice).toString(),
    6
  ).toString();

  const stopLossInGameCurrency = toDecimals(
    (stopLoss / lastPrice).toString(),
    6
  ).toString();

  console.log(wagerInGameCurrency, "wager in currency");

  const decimal = 18;

  const wagerInWei = parseUnits(wagerInGameCurrency, decimal);

  const stopGainInWei = parseUnits(stopGainInGameCurrency, decimal);

  const stopLossInWei = parseUnits(stopLossInGameCurrency, decimal);

  const tokenAddress = selectedCurrency;

  return {
    wagerInWei,
    tokenAddress,
    stopGainInWei,
    stopLossInWei,
  };
};

export default function CoinFlipPage() {
  const [formValues, setFormValues] = useState<CoinFlipFormFields>({
    betCount: 1,
    coinSide: CoinSide.HEADS,
    stopGain: 0,
    stopLoss: 0,
    wager: 1,
  });
  const [coinFlipResult, setCoinFlipResult] =
    useState<DecodedEvent<any, CoinFlipSettledEvent>>();
  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: "0xF27540d1f6AEe429A22bD3f6f1a048896CE44460",
    tokenAddress: "0x031C21aC79baac1E6AD074ea63ED9e9a318cab26",
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
        selectedCurrency: "0x031C21aC79baac1E6AD074ea63ED9e9a318cab26",
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
        "0xf9CfEf01CfF8dAE3eFDABa425C6B1D42EA6Bcc2D",
        tokenAddress,
        "0xE328a0B1e0bE7043c9141c2073e408D1086E1175",
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
        "0xf9CfEf01CfF8dAE3eFDABa425C6B1D42EA6Bcc2D",
        encodedParams.tokenAddress,
        "0xE328a0B1e0bE7043c9141c2073e408D1086E1175",
        "bet",
        encodedParams.encodedGameData,
      ],
      address: "0x8C502dCD4eA50208Cd6A62f3619811D774557302",
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
      const finalResult = getGameHubEventV2<any, CoinFlipSettledEvent>({
        eventType: GAME_HUB_EVENT_TYPES.Settled,
        account: currentAccount.address || "0x0",
      });

      await handleTx.mutateAsync();

      finalResult.then((res) => {
        setCoinFlipResult(res);
      });
    } catch (e: any) {
      console.log("error", e);
    }
  };

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
