"use client";
import React from "react";

import {
  HoldemPokerActiveGame,
  HoldemPokerFormFields,
  HoldemPokerTemplate,
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
import { Address, encodeAbiParameters, encodeFunctionData } from "viem";
import { prepareGameTransaction } from "../utils";
import { useContractConfigContext } from "../hooks/use-contract-config";

interface TemplateWithWeb3Props {
  minWager?: number;
  maxWager?: number;
  buildedGameUrl: string;
  onGameCompleted?: () => void;
}

const defaultActiveGame: HoldemPokerActiveGame = {
  gameIndex: null,
  cards: [],
  anteChipAmount: 0,
  aaBonusChipAmount: 0,

  player: {
    combination: 0,
    cards: [],
  },

  dealer: {
    combination: 0,
    cards: [],
  },
  payoutAmount: 0,
  paybackAmount: 0,
  result: 0,
};

export default function HoldemPokerGame(props: TemplateWithWeb3Props) {
  const [activeGame, setActiveGame] =
    React.useState<HoldemPokerActiveGame>(defaultActiveGame);
  const [formValues, setFormValues] = React.useState<HoldemPokerFormFields>({
    aaBonus: 0,
    ante: 0,
    wager: props.minWager || 1,
  });

  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
    wagmiConfig,
  } = useContractConfigContext();

  const currentAccount = useCurrentAccount();

  const { refetch: updateBalances } = useTokenBalances({
    account: currentAccount.address || "0x",
  });

  const { selectedToken } = useTokenStore((s) => ({
    selectedToken: s.selectedToken,
  }));

  const { priceFeed, getPrice } = usePriceFeed();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedToken.address,
    showDefaultToasts: false,
  });

  const encodedBetParams = React.useMemo(() => {
    const { tokenAddress, wagerInWei } = prepareGameTransaction({
      wager: formValues.wager,
      selectedCurrency: selectedToken,
      lastPrice: getPrice(selectedToken.address),
    });

    const { ante, aaBonus } = formValues;

    const encodedGameData = encodeAbiParameters(
      [
        { name: "anteChipAmount_", type: "uint128" },
        { name: "sideBetChipAmount_", type: "uint128" },
        { name: "chipAmount_", type: "uint128" },
      ],
      [ante as any, aaBonus as any, wagerInWei]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
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
    formValues.aaBonus,
    formValues.ante,
    formValues.wager,
    selectedToken.address,
    priceFeed[selectedToken.address],
  ]);

  const encodedFinalizeParams = React.useMemo(() => {
    const encodedGameData = encodeAbiParameters(
      [{ name: "fold", type: "boolean" }],
      [false]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "decide",
        encodedGameData,
      ],
    });

    return {
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [selectedToken.address]);

  const encodedFinalizeFoldParams = React.useMemo(() => {
    const encodedGameData = encodeAbiParameters(
      [{ name: "fold", type: "boolean" }],
      [true]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack as Address,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "decide",
        encodedGameData,
      ],
    });

    return {
      encodedGameData,
      encodedTxData: encodedData,
    };
  }, [selectedToken.address]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "bet",
        encodedBetParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedBetParams.encodedTxData,
  });

  const handleFinalizeTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "decide",
        encodedFinalizeParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedFinalizeParams.encodedTxData,
  });

  const handleFinalizeFoldTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.blackjack,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "decide",
        encodedFinalizeFoldParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedFinalizeFoldParams.encodedTxData,
  });

  const handleDeal = async () => {
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

  const handleFinalize = async () => {
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    try {
      await handleFinalizeTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
    }
  };

  const handleFinalizeFold = async () => {
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    try {
      await handleFinalizeFoldTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
    }
  };

  const onRefresh = () => {
    props.onGameCompleted && props.onGameCompleted();
    updateBalances();
  };

  return (
    <HoldemPokerTemplate
      minWager={props.minWager}
      maxWager={props.maxWager}
      buildedGameUrl={props.buildedGameUrl}
      activeGameData={activeGame}
      isInitialDataFetched={false}
      isLoggedIn={!!currentAccount.address}
      handleDeal={handleDeal}
      handleFinalize={handleFinalize}
      handleFinalizeFold={handleFinalizeFold}
      onRefresh={onRefresh}
      onFormChange={(v) => setFormValues(v)}
    />
  );
}
