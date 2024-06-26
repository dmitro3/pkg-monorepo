"use client";

import React, { useEffect } from "react";
import { useUnityBonanza } from "../../winr-bonanza/hooks/use-bonanza-unity";
import {
  controllerAbi,
  useCurrentAccount,
  useHandleTx,
  useTokenAllowance,
  winrBonanzaAbi,
} from "@winrlabs/web3";
import {
  Address,
  encodeAbiParameters,
  encodeFunctionData,
  formatUnits,
} from "viem";
import { useReadContract } from "wagmi";
import {
  cashierAddress,
  controllerAddress,
  gameAddresses,
  uiOperatorAddress,
} from "../../../../../providers";
import {
  DecodedEvent,
  prepareGameTransaction,
  useListenGameEvent,
} from "@winrlabs/web3-games";
import {
  Bonanza_Unity_Events,
  ReelSpinSettled,
  SpinType,
  WinrBonanzaFormFields,
  WinrBonanzaTemplate,
  useBonanzaGameStore,
} from "../../winr-bonanza";
import { Unity } from "react-unity-webgl";
import { toDecimals, toFormatted } from "@winrlabs/games";
import { useDebounce } from "use-debounce";

interface TemplateWithWeb3Props {
  buildedGameUrl: string;
  buildedGameUrlMobile: string;
}

type UnityEventData = {
  name: string;
  strParam: string;
};

export default function WinrBonanzaTemplateWithWeb3({
  buildedGameUrl,
  buildedGameUrlMobile,
}: TemplateWithWeb3Props) {
  const {
    sendMessage,
    isLoaded,
    loadingProgression,
    unityProvider,
    handleLogin,
    handleSetBalance,
    detachAndUnloadImmediate,
    handleUpdateWinText,
    handleUnlockUi,
    handleSendGrid,
    handleEnterFreespin,
    handleEnterFreespinWithoutScatter,
    handleExitFreespin,
    handleFreespinAmount,
    hideFreeSpinText,
    handleSpinStatus,
  } = useUnityBonanza({ buildedGameUrl, buildedGameUrlMobile });

  // const gameAddresses = "";
  // const controllerAddress = "";
  // const cashierAddress = "";
  // const uiOperatorAddress = "";
  // const selectedTokenAddress = "";
  // const wagmiConfig = "";

  const {
    betAmount,
    freeSpins,
    isDoubleChance,
    setBetAmount,
    setIsDoubleChance,
    setFreeSpins,
    setCurrentPayoutAmount,
    currentPayoutAmount,
    setIsInFreeSpinMode,
    isInFreeSpinMode,
    isLoggedIn,
    setIsLoggedIn,
  } = useBonanzaGameStore();

  const [freeSpinWinAmount, setFreeSpinWinAmount] = React.useState(0);
  const [isInAutoPlay, setIsInAutoPlay] = React.useState(false);
  const [initialBuyEvent, setInitialBuyEvent] = React.useState<any>(undefined);
  const [settledResult, setSettledResult] = React.useState<ReelSpinSettled>();
  const [previousFreeSpinCount, setPreviousFreeSpinCount] =
    React.useState<number>(0);
  const [wonFreeSpins, setWonFreeSpins] = React.useState(false);

  const [currentAction, setCurrentAction] = React.useState<
    "submit" | "initialAutoplay" | "buyFeature" | "freeSpin" | "autoPlay"
  >();

  const currentBalanceInDollar = 100;

  const actualBetAmount = isDoubleChance
    ? betAmount + betAmount * 0.5
    : betAmount;

  // Wrap the listener in a useCallback
  const handleMessageFromUnity = React.useCallback(
    (name: string, strParam: string) => {
      const obj: UnityEventData = {
        name,
        strParam,
      };

      setTimeout(() => {
        if (obj.name === Bonanza_Unity_Events.BET) {
          if (!isInFreeSpinMode || !isInAutoPlay) {
            handleSubmit();
          } else {
            return;
          }
        }

        if (obj.name === "M3_OnActiveAutoSpinMode") {
          console.log("ACTIVATE AUTOPLAY");

          handleInitialAutoPlay();

          setIsInAutoPlay(true);
        }

        if (obj.name === "M3_ScatterMatch") {
          console.log("SCATTER MATCH");

          if (!isInFreeSpinMode) {
            setIsDoubleChance(false);

            handleFreespinAmount(freeSpins);

            setIsInFreeSpinMode(true);

            setIsInAutoPlay(false);

            handleEnterFreespinWithoutScatter();
          }
        }

        if (obj.name === "M3_OnDeactiveAutoSpinMode") {
          console.log("DEACTIVATE AUTOPLAY");

          setIsInAutoPlay(false);
        }

        if (obj.name === "M3_WelcomeSpinClick") {
          handleLogin();

          setIsLoggedIn(true);
        }

        if (obj.name === Bonanza_Unity_Events.CHANGE_BET) {
          setBetAmount(Number(obj.strParam));
        }

        if (obj.name === Bonanza_Unity_Events.DOUBLE_CHANCE_CLICK) {
          console.log("DOUBLE CHANCE CLICK", obj.strParam);

          console.log("DOUBLE CHANCE CLICK VAL", obj.strParam === "true");

          setIsDoubleChance(obj.strParam === "true");
        }
        /* 
        if (obj.name === "M3_EnterFreeSpinAnimEnd") {
          handleFreespin();
        } */

        if (obj.name === Bonanza_Unity_Events.GRID_ANIMATION_FINISHED) {
          console.log("GRID ANIMATION FINISHED");

          if (isInFreeSpinMode) {
            sendMessage(
              "WebGLHandler",
              "ReceiveMessage",
              `M3_SetFreeSpinCount|${freeSpins}`
            );

            if (freeSpins === 0) {
              setTimeout(() => {
                handleExitFreespin();

                setIsInFreeSpinMode(false);

                sendMessage(
                  "WebGLHandler",
                  "ReceiveMessage",
                  `M3_OpenCongForEndFreeSpin|${toDecimals(
                    freeSpinWinAmount,
                    2
                  )}`
                );

                handleUnlockUi();
              }, 2000);
            } else {
              handleFreespin();
            }
          } else if (isInAutoPlay && !wonFreeSpins) {
            console.log("GRID ANIMATION FINISHED AND CALLED AUTOPLAY");

            handleAutoPlay();
          } else if (!wonFreeSpins) {
            handleUnlockUi();
          }

          if (currentPayoutAmount > 0) {
            if (!isInFreeSpinMode) {
              handleUpdateWinText(currentPayoutAmount.toString());
            } else {
              handleUpdateWinText(freeSpinWinAmount.toString());
            }
          }

          // onRefresh();
        }

        if (obj.name === Bonanza_Unity_Events.BUY_FEATURE_CLICK) {
          handleBuy();

          setIsInFreeSpinMode(true);

          // handleEnterFreespin();
        }

        if (obj.name === Bonanza_Unity_Events.CLOSED_CONGRATULATIONS_PANEL) {
          if (
            isInFreeSpinMode &&
            initialBuyEvent &&
            initialBuyEvent?.freeSpinsLeft > 0
          ) {
            const event = initialBuyEvent;

            sendMessage("WebGLHandler", "ReceiveMessage", `M3_SpinClickAction`);

            handleSendGrid(event.grid);

            setFreeSpins(event.freeSpinsLeft);

            sendMessage(
              "WebGLHandler",
              "ReceiveMessage",
              `M3_SetFreeSpinCount|${event.freeSpinsLeft}`
            );

            if (event.payoutMultiplier > 0) {
              const payout = toDecimals(
                event.payoutMultiplier * (1 * event.betAmount),
                2
              );

              setCurrentPayoutAmount(payout);

              setFreeSpinWinAmount(payout);
            }
          }

          if (isInFreeSpinMode && !initialBuyEvent) {
            handleFreespin();
          }

          // handleBuy();
          // handleEnterFreespin();
          // freeSpinTx();
        }
      }, 10);
    },
    [
      sendMessage,
      betAmount,
      currentPayoutAmount,
      isInFreeSpinMode,
      freeSpinWinAmount,
      freeSpins,
      initialBuyEvent,
      isInAutoPlay,
      setIsDoubleChance,
      isDoubleChance,
      wonFreeSpins,
      previousFreeSpinCount,
    ]
  );

  React.useEffect(() => {
    if (!handleEnterFreespin) return;
    if (!sendMessage) return;
    if (isInFreeSpinMode) return;
    if (!isLoggedIn) return;
    if (!freeSpins) return;
    if (wonFreeSpins) return;
    if (!previousFreeSpinCount) return;

    setIsDoubleChance(false);
    handleEnterFreespinWithoutScatter();
    handleFreespinAmount(freeSpins);
    setIsInFreeSpinMode(true);
    setIsInAutoPlay(false);
  }, [
    freeSpins,
    isLoggedIn,
    isInFreeSpinMode,
    handleEnterFreespin,
    currentPayoutAmount,
    sendMessage,
    wonFreeSpins,
    previousFreeSpinCount,
  ]);

  React.useEffect(() => {
    const gameEvent = settledResult as ReelSpinSettled;
    if (currentAction == "submit" && gameEvent?.type == "Game") {
      handleSendGrid(gameEvent.grid);

      setFormValues({ betAmount, actualBetAmount, isDoubleChance });
      console.log("SUBMIT gameEvent", gameEvent);

      if (gameEvent.freeSpinsLeft > 0) {
        setWonFreeSpins(true);
      }

      setFreeSpins(gameEvent.freeSpinsLeft);

      if (gameEvent.payoutMultiplier > 0) {
        let _wager = gameEvent.betAmount;

        console.log("betamount", gameEvent.betAmount);

        if (gameEvent.spinType === SpinType.DOUBLE_CHANCE) {
          _wager = (gameEvent.betAmount * 2) / 3;
        } else {
          _wager = gameEvent.betAmount;
        }

        console.log("WAGER", _wager);

        const payout = toDecimals(gameEvent.payoutMultiplier * (1 * _wager), 2);

        setCurrentPayoutAmount(payout);
      }

      //      onRefresh();
    }

    if (currentAction == "buyFeature" && gameEvent?.type == "Game") {
      console.log("free spin event", gameEvent);

      console.log("grid", JSON.stringify(gameEvent.grid).replace(/,/g, ", "));

      setInitialBuyEvent(gameEvent);
    }

    if (currentAction == "freeSpin" && gameEvent?.type == "Game") {
      const _betAmount = toDecimals(gameEvent.betAmount * 1, 2);

      if (
        !window.GetMessageFromUnity ||
        typeof window.GetMessageFromUnity === "undefined" ||
        typeof window.GetMessageFromUnity !== "function"
      ) {
        window.GetMessageFromUnity = handleMessageFromUnity;
      }

      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `M3_SetBetValue|${_betAmount}`
      );

      sendMessage("WebGLHandler", "ReceiveMessage", `M3_SpinClickAction`);

      console.log("free spin event", gameEvent);

      console.log("grid", JSON.stringify(gameEvent.grid).replace(/,/g, ", "));

      handleSendGrid(gameEvent.grid);

      setFreeSpins(gameEvent.freeSpinsLeft);

      if (gameEvent.payoutMultiplier > 0) {
        const payout = toDecimals(
          gameEvent.payoutMultiplier * (1 * gameEvent.betAmount),
          2
        );

        setCurrentPayoutAmount(payout);

        setFreeSpinWinAmount(freeSpinWinAmount + payout);
      }
    }

    if (currentAction == "autoPlay" && gameEvent?.type == "Game") {
      console.log("AUTOPLAY SUCCESS");

      if (
        !window.GetMessageFromUnity ||
        typeof window.GetMessageFromUnity === "undefined" ||
        typeof window.GetMessageFromUnity !== "function"
      ) {
        window.GetMessageFromUnity = handleMessageFromUnity;
      }

      sendMessage("WebGLHandler", "ReceiveMessage", `M3_SpinClickAction`);

      if (gameEvent.freeSpinsLeft > 0) {
        setWonFreeSpins(true);
      }

      handleSendGrid(gameEvent.grid);

      setFreeSpins(gameEvent.freeSpinsLeft);

      if (gameEvent.payoutMultiplier > 0) {
        let _wager = gameEvent.betAmount;

        console.log("betamount", gameEvent.betAmount);

        if (gameEvent.spinType === SpinType.DOUBLE_CHANCE) {
          _wager = (gameEvent.betAmount * 2) / 3;
        } else {
          _wager = gameEvent.betAmount;
        }

        console.log("WAGER", _wager);

        const payout = toDecimals(gameEvent.payoutMultiplier * (1 * _wager), 2);

        setCurrentPayoutAmount(payout);
      }

      // onRefresh();
    }

    if (currentAction == "initialAutoplay" && gameEvent?.type == "Game") {
      if (
        !window.GetMessageFromUnity ||
        typeof window.GetMessageFromUnity === "undefined" ||
        typeof window.GetMessageFromUnity !== "function"
      ) {
        window.GetMessageFromUnity = handleMessageFromUnity;
      }

      sendMessage("WebGLHandler", "ReceiveMessage", `M3_SpinClickAction`);

      console.log("INITIAL AUTOPLAY RESULT");

      handleSendGrid(gameEvent.grid);

      if (gameEvent.freeSpinsLeft > 0) {
        setWonFreeSpins(true);
      }

      setFreeSpins(gameEvent.freeSpinsLeft);

      if (gameEvent.payoutMultiplier > 0) {
        let _wager = gameEvent.betAmount;

        console.log("betamount", gameEvent.betAmount);

        if (gameEvent.spinType === SpinType.DOUBLE_CHANCE) {
          _wager = (gameEvent.betAmount * 2) / 3;
        } else {
          _wager = gameEvent.betAmount;
        }

        console.log("WAGER", _wager);

        const payout = toDecimals(gameEvent.payoutMultiplier * (1 * _wager), 2);

        setCurrentPayoutAmount(payout);
      }

      // onRefresh();
    }
  }, [settledResult, currentAction]);

  React.useEffect(() => {
    // Check if GetMessageFromUnity is not already defined to avoid overwriting
    if (
      typeof window !== "undefined" &&
      typeof window.GetMessageFromUnity === "undefined"
    ) {
      // Assign the listener to the window object
      window.GetMessageFromUnity = handleMessageFromUnity;
    }

    // Cleanup function to remove the listener
    return () => {
      if (
        typeof window !== "undefined" &&
        window.GetMessageFromUnity === handleMessageFromUnity
      ) {
        delete window.GetMessageFromUnity;
      }
    };
  }, [
    handleMessageFromUnity,
    isInFreeSpinMode,
    currentPayoutAmount,
    freeSpinWinAmount,
    freeSpins,
    wonFreeSpins,
  ]);

  const handleFreespin = async () => {
    console.log("FREESPIN");
    await wait(300);
    setCurrentPayoutAmount(0);
    setWonFreeSpins(false);
    setInitialBuyEvent(undefined);
    setCurrentAction("freeSpin");

    try {
      await handleFreeSpin();
    } catch (e: any) {
      // onError && onError(e);
    }
  };

  const handleBuy = async () => {
    setCurrentPayoutAmount(0);
    handleUpdateWinText("0");
    setFreeSpinWinAmount(0);
    setInitialBuyEvent(undefined);
    setWonFreeSpins(false);

    setCurrentAction("buyFeature");

    try {
      await handleBuyFreeSpins();

      handleEnterFreespin();
    } catch (e: any) {
      setInitialBuyEvent(undefined);
      handleExitFreespin();
      handleFreespinAmount(0);
      hideFreeSpinText();
      setIsInFreeSpinMode(false);

      //  onError && onError(e);
    }
  };

  const handleSubmit = async () => {
    if (isInFreeSpinMode) return;
    if (isInAutoPlay) return;

    setInitialBuyEvent(undefined);
    hideFreeSpinText();
    setCurrentPayoutAmount(0);
    handleUpdateWinText("0");
    setFreeSpinWinAmount(0);
    setWonFreeSpins(false);
    // for event handling
    setCurrentAction("submit");

    try {
      await handleBet();
    } catch (e: any) {
      handleUnlockUi();
      // onError && onError(e);
    }
  };

  const handleAutoPlay = async () => {
    setInitialBuyEvent(undefined);

    if (isInFreeSpinMode) return;
    if (!isInAutoPlay) return;

    setCurrentPayoutAmount(0);
    handleUpdateWinText("0");
    setFreeSpinWinAmount(0);
    setWonFreeSpins(false);
    setCurrentAction("autoPlay");

    try {
      await handleBet();
    } catch (e: any) {
      handleUnlockUi();
      //  onError && onError(e);
    }
  };

  const handleInitialAutoPlay = async () => {
    console.log("INITIAL AUTOPLAY");

    setInitialBuyEvent(undefined);

    if (isInFreeSpinMode) return;

    setCurrentPayoutAmount(0);
    handleUpdateWinText("0");
    setFreeSpinWinAmount(0);
    setWonFreeSpins(false);

    setCurrentAction("initialAutoplay");

    try {
      await handleBet();
    } catch (e: any) {
      handleUnlockUi();
      // onError && onError(e);
    }
  };

  const selectedTokenAddress = "0x4b45108FfBb6d87aEAF59aCeeADb205C605F3125";

  const [formValues, setFormValues] = React.useState<WinrBonanzaFormFields>({
    betAmount: 1,
    actualBetAmount: 1,
    isDoubleChance: false,
  });

  const gameEvent = useListenGameEvent();

  const currentAccount = useCurrentAccount();

  const allowance = useTokenAllowance({
    amountToApprove: 999,
    owner: currentAccount.address || "0x",
    spender: cashierAddress,
    tokenAddress: selectedTokenAddress,
    showDefaultToasts: false,
  });

  const encodedParams = React.useMemo(() => {
    console.log(
      formValues.actualBetAmount,
      formValues.isDoubleChance,
      "form fields"
    );
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
      [{ name: "wager", type: "uint128" }],
      [wagerInWei]
    );

    const encodedData: `0x${string}` = encodeFunctionData({
      abi: controllerAbi,
      functionName: "perform",
      args: [
        gameAddresses.winrBonanza as Address,
        tokenAddress,
        uiOperatorAddress as Address,
        "buyFreeSpins",
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
        encodedBuyFreeSpinParams.tokenAddress,
        uiOperatorAddress as Address,
        "freeSpin",
        encodedFreeSpinParams.encodedTxData,
      ],
      address: controllerAddress as Address,
    },
    options: {},
    encodedTxData: encodedFreeSpinParams.encodedTxData,
  });

  const handleBet = async (errorCount = 0) => {
    console.log("spin button called!");

    // if (!allowance.hasAllowance) {
    //   const handledAllowance = await allowance.handleAllowance({
    //     errorCb: (e: any) => {
    //       console.log("error", e);
    //     },
    //   });

    //   if (!handledAllowance) return;
    // }

    console.log("allowance available");

    // await handleTx.mutateAsync();
    console.log("handleFreeSpintx called");

    try {
      await handleTx.mutateAsync();
    } catch (e: any) {
      if (errorCount < 10) handleBet(errorCount + 1);
      throw new Error(e);
    }
  };

  const handleBuyFreeSpins = async () => {
    // if (!allowance.hasAllowance) {
    //   const handledAllowance = await allowance.handleAllowance({
    //     errorCb: (e: any) => {
    //       console.log("error", e);
    //     },
    //   });
    //   if (!handledAllowance) return;
    // }
    console.log("buy feature");
    await handleBuyFeatureTx.mutateAsync();
  };

  const handleFreeSpin = async (errorCount = 0) => {
    // if (!allowance.hasAllowance) {
    //   const handledAllowance = await allowance.handleAllowance({
    //     errorCb: (e: any) => {
    //       console.log("error", e);
    //     },
    //   });
    //   if (!handledAllowance) return;
    // }

    console.log("handleFreeSpintx called");

    try {
      await handleFreeSpinTx.mutateAsync();
    } catch (e: any) {
      if (errorCount < 10) handleFreeSpin(errorCount + 1);
    }
  };

  const gameDataRead = useReadContract({
    //    config: wagmiConfig,
    abi: winrBonanzaAbi,
    address: gameAddresses.winrBonanza as `0x${string}`,
    functionName: "getGame",
    args: [currentAccount.address || "0x0000000"],
    query: {
      enabled: !!currentAccount.address,
    },
  });

  const handleRefresh = async () => {};

  React.useEffect(() => {
    const gameData = gameDataRead.data as any;

    console.log(gameData, "GAME DATA");

    if (gameData) {
      setPreviousFreeSpinCount(gameData.freeSpinCount);
    }
  }, [gameDataRead.data]);

  React.useEffect(() => {
    console.log(gameEvent, "GAME EVENT!!");

    if (
      gameEvent?.program[0]?.type == "Game" &&
      gameEvent?.program[0].data?.state == 2
    ) {
      const data = gameEvent.program[0].data;

      setSettledResult({
        betAmount: Number(formatUnits(data.wager, 18)),
        scatterCount: data.result.scatter,
        tumbleCount: data.result.tumble,
        freeSpinsLeft: data.freeSpinCount,
        payoutMultiplier: data.result.payoutMultiplier / 100,
        grid: data.result.outcomes,
        type: "Game",
        spinType: data.spinType,
      });
    }
  }, [gameEvent]);

  React.useEffect(() => {
    if (previousFreeSpinCount > 0) {
      setFreeSpins(previousFreeSpinCount || 0);

      sendMessage(
        "WebGLHandler",
        "ReceiveMessage",
        `M3_SetFreeSpinCount|${freeSpins}`
      );
    }
  }, [previousFreeSpinCount]);

  React.useEffect(() => {
    if (!sendMessage) return;

    handleSetBalance(toFormatted(currentBalanceInDollar, 2));
  }, [handleSetBalance, currentBalanceInDollar, sendMessage]);

  React.useEffect(() => {
    return () => {
      detachAndUnloadImmediate();
    };
  }, [detachAndUnloadImmediate]);

  /* const formFields = React.useMemo(
    () => ({ betAmount, actualBetAmount, isDoubleChance }),
    [betAmount, actualBetAmount, isDoubleChance]
  );

  const debouncedFormFields = useDebounce(formFields, 100); */

  return (
    <section
      className={
        "wr-relative wr-w-full wr-p-0 wr-flex wr-overflow-hidden wr-rounded-xl wr-border wr-border-zinc-800 max-lg:wr-flex-col-reverse lg:wr-h-[672px]"
      }
      id="animationScene"
    >
      <div className="wr-w-full max-lg:wr-border-b  max-lg:wr-border-zinc-800">
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={2}
          className="wr-h-full wr-w-full wr-rounded-t-md wr-bg-zinc-900 max-md:wr-h-[360px] lg:wr-rounded-md"
        />
      </div>
    </section>
  );
}
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
