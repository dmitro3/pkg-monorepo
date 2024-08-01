"use client";

import { useGameControllerGetMultiplayerGameHistory } from "@winrlabs/api";
import {
  ANGLE_SCALE,
  BetHistoryTemplate,
  CoinFlipGameResult,
  colorMultipliers,
  GameType,
  MultiplayerGameStatus,
  Multiplier,
  participantMapWithStore,
  toFormatted,
  useConfigureMultiplayerLiveResultStore,
  useLiveResultStore,
  useWheelGameStore,
  WheelColor,
  WheelFormFields,
  WheelTemplate,
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
import React, { useEffect, useMemo, useState } from "react";
import {
  Address,
  encodeAbiParameters,
  encodeFunctionData,
  formatUnits,
  fromHex,
} from "viem";

import {
  useBetHistory,
  useListenMultiplayerGameEvent,
  usePlayerGameStatus,
} from "../hooks";
import { useContractConfigContext } from "../hooks/use-contract-config";
import { GAME_HUB_GAMES, prepareGameTransaction } from "../utils";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

interface TemplateWithWeb3Props {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  hideBetHistory?: boolean;

  onAnimationCompleted?: (result: CoinFlipGameResult[]) => void;
}

export default function WheelGame(props: TemplateWithWeb3Props) {
  const {
    gameAddresses,
    controllerAddress,
    cashierAddress,
    uiOperatorAddress,
    wagmiConfig,
  } = useContractConfigContext();

  const {
    isPlayerHalted,
    isReIterable,
    playerLevelUp,
    playerReIterate,
    refetchPlayerGameStatus,
  } = usePlayerGameStatus({
    gameAddress: gameAddresses.wheel,
    gameType: GameType.WHEEL,
    wagmiConfig,
  });

  const selectedToken = useTokenStore((s) => s.selectedToken);
  const selectedTokenAddress = selectedToken.address;
  const { data: betHistory, refetch: refetchBetHistory } =
    useGameControllerGetMultiplayerGameHistory({
      queryParams: {
        game: GameType.WHEEL,
        // TODO: swagger does not include the pagination params. ask be to fix it.
        // @ts-ignore
        limit: 2,
      },
    });
  const { updateState, setWheelParticipant, setIsGamblerParticipant } =
    useWheelGameStore([
      "updateState",
      "setWheelParticipant",
      "setIsGamblerParticipant",
    ]);

  const [formValues, setFormValues] = useState<WheelFormFields>({
    color: WheelColor.IDLE,
    wager: props?.minWager || 1,
  });

  useConfigureMultiplayerLiveResultStore();
  const {
    addResult,
    updateGame,
    clear: clearLiveResults,
  } = useLiveResultStore(["addResult", "clear", "updateGame", "skipAll"]);

  const gameEvent = useListenMultiplayerGameEvent(GAME_HUB_GAMES.wheel);

  const currentAccount = useCurrentAccount();
  const allTokens = useTokenStore((s) => s.tokens);
  const { priceFeed } = usePriceFeed();
  const { refetch: updateBalances } = useTokenBalances({
    account: currentAccount.address || "0x",
  });

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x0000000",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const encodedParams = useMemo(() => {
    const { tokenAddress, wagerInWei } = prepareGameTransaction({
      wager: formValues.wager,
      stopGain: 0,
      stopLoss: 0,
      selectedCurrency: selectedToken,
      lastPrice: priceFeed[selectedToken.priceKey],
    });

    const encodedGameData = encodeAbiParameters(
      [
        { name: "wager", type: "uint128" },
        { name: "color", type: "uint8" },
      ],
      [wagerInWei, formValues.color as unknown as number]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.wheel as Address,
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
    formValues.color,
    formValues.wager,
    selectedToken.address,
    priceFeed[selectedToken.priceKey],
  ]);

  const handleTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.wheel,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "bet",
        encodedParams.encodedGameData,
      ],
      address: controllerAddress as Address,
    },
    options: {
      // TODO: consider it. it breaks he caching mechanism and refetch and ignroe the cached op
      forceRefetch: true,
    },
    encodedTxData: encodedParams.encodedTxData,
  });

  const encodedClaimParams = useMemo(() => {
    // const { tokenAddress } = prepareGameTransaction({
    //   wager: formValues.wager,
    //   stopGain: 0,
    //   stopLoss: 0,
    //   selectedCurrency: selectedTokenAddress,
    //   lastPrice: 1,
    // });

    const encodedChoice = encodeAbiParameters([], []);

    const encodedParams = encodeAbiParameters(
      [
        { name: "address", type: "address" },
        {
          name: "data",
          type: "address",
        },
        {
          name: "bytes",
          type: "bytes",
        },
      ],
      [
        currentAccount.address || "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        encodedChoice,
      ]
    );

    const encodedClaimData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.wheel as Address,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "claim",
        encodedParams,
      ],
    });

    return {
      encodedClaimData,
      encodedClaimTxData: encodedClaimData,
      currentAccount,
    };
  }, [formValues.color, formValues.wager, selectedToken.bankrollIndex]);

  const handleClaimTx = useHandleTx<typeof controllerAbi, "perform">({
    writeContractVariables: {
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.wheel,
        selectedToken.bankrollIndex,
        uiOperatorAddress as Address,
        "claim",
        encodedClaimParams.encodedClaimData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedClaimParams.encodedClaimTxData,
  });

  const onGameSubmit = async () => {
    clearLiveResults();
    if (!allowance.hasAllowance) {
      const handledAllowance = await allowance.handleAllowance({
        errorCb: (e: any) => {
          console.log("error", e);
        },
      });

      if (!handledAllowance) return;
    }

    console.log("CLAIM TX!");
    try {
      await handleClaimTx.mutateAsync();
    } catch (error) {}

    console.log("cLAIM TX SUCCESS, TRYING BET TX");

    try {
      if (isPlayerHalted) await playerLevelUp();
      if (isReIterable) await playerReIterate();

      await handleTx.mutateAsync();
    } catch (e: any) {
      console.log("error", e);
      refetchPlayerGameStatus();
    }

    console.log("BET TX COMPLETED");

    setIsGamblerParticipant(true);
  };

  React.useEffect(() => {
    if (!gameEvent) return;

    const currentTime = new Date().getTime() / 1000;
    let status: MultiplayerGameStatus = MultiplayerGameStatus.None;

    const {
      cooldownFinish,
      joiningFinish,
      joiningStart,
      randoms,
      result,
      player,
      bet,
      participants,
      isGameActive,
      angle,
      session,
    } = gameEvent;

    const isGameFinished =
      currentTime >= joiningFinish && joiningFinish > 0 && randoms;
    const shouldWait =
      currentTime <= joiningFinish && currentTime >= joiningStart;

    if (shouldWait) {
      status = MultiplayerGameStatus.Wait;
    }

    if (isGameFinished) {
      status = MultiplayerGameStatus.Finish;
    }

    updateState({
      status,
      joiningFinish,
      joiningStart,
      // TODO: cooldownFinish is too early. need to fix it.
      cooldownFinish: cooldownFinish + 5,
      winnerColor: result as unknown as WheelColor,
      winnerAngle: Number(angle) / 100000 / ANGLE_SCALE,
    });

    updateGame({
      wager: formValues.wager || 0,
    });

    if (participants?.length > 0 && isGameActive) {
      participants.forEach((p) => {
        if (p.player === currentAccount.address) {
          setIsGamblerParticipant(true);
        }

        const token = allTokens.find(
          (t) => t.bankrollIndex === p.session.bankroll
        );
        const tokenDecimal = token?.decimals || 0;

        setWheelParticipant(
          participantMapWithStore[
            fromHex(p.choice, {
              to: "number",
            }) as unknown as WheelColor
          ],
          {
            player: p.player,
            bet: Number(toFormatted(formatUnits(p.wager, tokenDecimal), 3)),
          }
        );
      });
    }

    if (bet && bet?.converted?.wager && player) {
      setWheelParticipant(participantMapWithStore[bet.choice] as Multiplier, {
        player: player,
        bet: Number(toFormatted(bet.converted.wager, 3)),
      });
    }
  }, [gameEvent, currentAccount.address]);

  useEffect(() => {
    if (betHistory && betHistory?.length > 0) {
      updateState({
        lastBets: betHistory.map(
          (data) =>
            participantMapWithStore[data.result as unknown as WheelColor]
        ),
      });
    }
  }, [betHistory]);

  const {
    betHistory: allBetHistory,
    isHistoryLoading,
    mapHistoryTokens,
    setHistoryFilter,
    refetchHistory,
  } = useBetHistory({
    gameType: GameType.WHEEL,
    options: {
      enabled: !props.hideBetHistory,
    },
  });

  const onWheelCompleted = () => {
    refetchBetHistory();
    refetchHistory();
    refetchPlayerGameStatus();
    updateBalances();

    const { result } = gameEvent;
    const isWon = result === Number(formValues.color);

    addResult({
      won: isWon,
      payout: isWon
        ? formValues.wager * colorMultipliers[String(result) as WheelColor]
        : 0,
    });
  };

  return (
    <>
      <WheelTemplate
        {...props}
        onSubmitGameForm={onGameSubmit}
        onFormChange={(val) => {
          setFormValues(val);
        }}
        onComplete={onWheelCompleted}
      />
      {!props.hideBetHistory && (
        <BetHistoryTemplate
          betHistory={allBetHistory || []}
          loading={isHistoryLoading}
          onChangeFilter={(filter) => setHistoryFilter(filter)}
          currencyList={mapHistoryTokens}
        />
      )}
    </>
  );
}
