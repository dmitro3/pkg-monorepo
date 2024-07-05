"use client";

import React from "react";
import {
  ActiveGameHands,
  BlackjackFormFields,
  BlackjackGameStatus,
  BlackjackTemplate,
  GameStruct,
} from "@winrlabs/games";
import { useContractConfigContext } from "../hooks/use-contract-config";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  useTokenAllowance,
} from "@winrlabs/web3";
import { prepareGameTransaction } from "../utils";
import { Address, encodeAbiParameters, encodeFunctionData } from "viem";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

interface TemplateWithWeb3Props {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onGameCompleted: () => void;
}

const defaultActiveGameHands = {
  dealer: {
    cards: null,
    hand: null,
  },
  firstHand: {
    cards: null,
    hand: null,
  },
  secondHand: {
    cards: null,
    hand: null,
  },
  thirdHand: {
    cards: null,
    hand: null,
  },
  splittedFirstHand: {
    cards: null,
    hand: null,
  },
  splittedSecondHand: {
    cards: null,
    hand: null,
  },
  splittedThirdHand: {
    cards: null,
    hand: null,
  },
};

const defaultGameData = {
  activeHandIndex: 0,
  canInsure: false,
  status: BlackjackGameStatus.NONE,
};

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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<BlackjackFormFields>({
    wager: props.minWager || 1,
    handIndex: 0,
    firstHandWager: 0,
    secondHandWager: 0,
    thirdHandWager: 0,
  });

  const [activeGameData, setActiveGameData] =
    React.useState<GameStruct>(defaultGameData);

  const [activeGameHands, setActiveGameHands] = React.useState<ActiveGameHands>(
    defaultActiveGameHands
  );

  const [initialDataFetched, setInitialDataFetched] =
    React.useState<boolean>(false);

  const [isRpcRefetched, setIsRpcRefetched] = React.useState<boolean>(false);

  const resetGame = () => {
    setActiveGameData(defaultGameData);

    setActiveGameHands(defaultActiveGameHands);

    setIsRpcRefetched(false);
  };

  // TRANSACTIONS
  const currentAccount = useCurrentAccount();
  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const encodedBetParams = React.useMemo(() => {
    const { tokenAddress, wagerInWei } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const { firstHandWager, secondHandWager, thirdHandWager } = formValues;

    const betAmounts: any = [];

    if (firstHandWager > 0) betAmounts.push(firstHandWager);

    if (secondHandWager > 0) betAmounts.push(secondHandWager);

    if (thirdHandWager > 0) betAmounts.push(thirdHandWager);

    const amountHands = betAmounts.length;

    const encodedGameData = encodeAbiParameters(
      [
        { name: "wager", type: "uint128" },
        { name: "chipAmounts", type: "uint16[3]" },
        { name: "amountHands", type: "uint8" },
      ],
      [wagerInWei, betAmounts, amountHands]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
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
    formValues.firstHandWager,
    formValues.secondHandWager,
    formValues.thirdHandWager,
    formValues.wager,
  ]);

  const encodedHitParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [{ name: "handIndex", type: "uint256" }],
      [formValues.handIndex as unknown as bigint]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "hitAnotherCard",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.handIndex]);

  const encodedStandParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [{ name: "handIndex", type: "uint256" }],
      [formValues.handIndex as unknown as bigint]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "standOff",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.handIndex]);

  const encodedDoubleParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [{ name: "handIndex", type: "uint256" }],
      [formValues.handIndex as unknown as bigint]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "doubleDown",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.handIndex]);

  const encodedSplitParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [{ name: "handIndex", type: "uint256" }],
      [formValues.handIndex as unknown as bigint]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "splitHand",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.handIndex]);

  const encodedBuyInsuranceParams = React.useMemo(() => {
    const { tokenAddress } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedTokenAddress,
      lastPrice: 1,
    });

    const encodedGameData = encodeAbiParameters(
      [{ name: "handIndex", type: "uint256" }],
      [formValues.handIndex as unknown as bigint]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "buyInsurance",
        encodedGameData,
      ],
    });

    return {
      tokenAddress,
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [formValues.handIndex]);

  const handleBetTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedBetParams.tokenAddress,
        uiOperatorAddress as Address,
        "bet",
        encodedBetParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedBetParams.encodedTxData,
  });

  const handleHitTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedHitParams.tokenAddress,
        uiOperatorAddress as Address,
        "hitAnotherCard",
        encodedHitParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedHitParams.encodedTxData,
  });

  const handleStandTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedStandParams.tokenAddress,
        uiOperatorAddress as Address,
        "standOff",
        encodedStandParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedStandParams.encodedTxData,
  });

  const handleDoubleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedDoubleParams.tokenAddress,
        uiOperatorAddress as Address,
        "doubleDown",
        encodedDoubleParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedDoubleParams.encodedTxData,
  });

  const handleSplitTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedSplitParams.tokenAddress,
        uiOperatorAddress as Address,
        "splitHand",
        encodedSplitParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedSplitParams.encodedTxData,
  });

  const handleBuyInsuranceTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        encodedBuyInsuranceParams.tokenAddress,
        uiOperatorAddress as Address,
        "buyInsurance",
        encodedBuyInsuranceParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedBuyInsuranceParams.encodedTxData,
  });

  const handleStart = async () => {
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
      await handleBetTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleHit = async () => {
    try {
      await handleHitTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleStand = async () => {
    try {
      await handleStandTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleDoubleDown = async () => {
    try {
      await handleDoubleTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleSplit = async () => {
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
      await handleSplitTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleBuyInsurance = async () => {
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
      await handleBuyInsuranceTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <BlackjackTemplate
      activeGameData={activeGameData}
      activeGameHands={activeGameHands}
      initialDataFetched={initialDataFetched}
      minWager={props.minWager}
      maxWager={props.maxWager}
      onFormChange={(v) => setFormValues(v)}
      onGameCompleted={props.onGameCompleted}
      isControllerDisabled={isLoading}
      onDeal={handleStart}
      onHit={handleHit}
      onDoubleDown={handleDoubleDown}
      onInsure={handleBuyInsurance}
      onSplit={handleSplit}
      onStand={handleStand}
      onReset={resetGame}
      options={{}}
    />
  );
}
