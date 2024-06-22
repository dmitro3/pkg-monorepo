import { WinrBonanzaFormFields, WinrBonanzaTemplate } from "@winrlabs/games";
import { useListenGameEvent } from "../hooks/use-listen-game-event";
import {
  DecodedEvent,
  SingleStepSettledEvent,
  prepareGameTransaction,
} from "../utils";
import React from "react";
import { useContractConfigContext } from "../hooks/use-contract-config";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  useTokenAllowance,
} from "@winrlabs/web3";
import { Address, encodeAbiParameters, encodeFunctionData } from "viem";

interface TemplateWithWeb3Props {
  buildedGameUrl: string;
  buildedGameUrlMobile: string;
}

export default function WinrBonanzaTemplateWithWeb3({
  buildedGameUrl,
  buildedGameUrlMobile,
}: TemplateWithWeb3Props) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
    selectedTokenAddress,
  } = useContractConfigContext();

  const [formValues, setFormValues] = React.useState<WinrBonanzaFormFields>({
    betAmount: 0,
    actualBetAmount: 0,
    isDoubleChance: false,
  });

  const gameEvent = useListenGameEvent();

  const [settledResult, setSettledResult] =
    React.useState<DecodedEvent<any, SingleStepSettledEvent>>();
  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const encodedParams = React.useMemo(() => {
    const { tokenAddress, wagerInWei } = prepareGameTransaction({
      wager: formValues.actualBetAmount,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [
        { name: "wager", type: "uint128" },
        { name: "isDoubleChance", type: "bool" },
      ],
      [wagerInWei, formValues.isDoubleChance]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
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
  }, [formValues.isDoubleChance, formValues.actualBetAmount]);

  const encodedBuyFreeSpinParams = React.useMemo(() => {
    const { tokenAddress, wagerInWei } = prepareGameTransaction({
      wager: formValues.betAmount,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [
        { name: "wager", type: "uint128" },
        { name: "isDoubleChance", type: "bool" },
      ],
      [wagerInWei, formValues.isDoubleChance]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
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
  }, [formValues.betAmount, selectedTokenAddress]);

  const encodedFreeSpinParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.betAmount,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "freeSpin",
        "0x",
      ],
    });

    return {
      tokenAddress,
      encodedTxData: encodedData,
    };
  }, [formValues.betAmount, selectedTokenAddress]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
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

  const handleBuyFeatureTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
        encodedBuyFreeSpinParams.tokenAddress,
        uiOperatorAddress as Address,
        "buyFreeSpins",
        encodedBuyFreeSpinParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedBuyFreeSpinParams.encodedTxData,
  });

  const handleFreeSpinTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
        encodedFreeSpinParams.tokenAddress,
        uiOperatorAddress as Address,
        "freeSpin",
        "0x",
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedFreeSpinParams.encodedTxData,
  });

  const handleBet = async () => {
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    await handleTx.mutateAsync();
  };

  const handleBuyFreeSpins = async () => {
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    await handleBuyFeatureTx.mutateAsync();
  };

  const handleFreeSpin = async () => {};

  const handleRefresh = async () => {
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    await handleFreeSpinTx.mutateAsync();
  };

  React.useEffect(() => {
    console.log(gameEvent, "GAME EVENT!!");
  }, [gameEvent]);

  return (
    <WinrBonanzaTemplate
      onRefresh={handleRefresh}
      onFormChange={(val) => setFormValues(val)}
      buildedGameUrl={buildedGameUrl}
      buildedGameUrlMobile={buildedGameUrlMobile}
      bet={handleBet}
      buyFreeSpins={handleBuyFreeSpins}
      freeSpin={handleFreeSpin}
      gameEvent={null as any}
      previousFreeSpinCount={0}
    />
  );
}
