import React from "react";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";
import { CardArea } from "../baccarat-card-area";
import { renderChipIcon } from "../../../../common/chip-controller/utils";
import {
  BaccaratBetType,
  BaccaratGameResult,
  BaccaratGameSettledResult,
} from "../../types";
import { Chip } from "../../../../common/chip-controller/types";
import { cn } from "../../../../utils/style";
import { CDN_URL } from "../../../../constants";

// canvas width 900px
// canvas height 900px
// canvas moved top -200px

export interface BaccaratSceneProps {
  baccaratResults: BaccaratGameResult | null;
  baccaratSettled: BaccaratGameSettledResult | null;
  isDisabled: boolean;
  setIsDisabled: (b: boolean) => void;
  addWager: (wager: Chip, betType: BaccaratBetType) => void;
  selectedChip: Chip;
  onAnimationCompleted: (r: BaccaratGameSettledResult) => void;
}

export const BaccaratScene: React.FC<BaccaratSceneProps> = ({
  baccaratResults,
  baccaratSettled,
  addWager,
  isDisabled,
  setIsDisabled,
  selectedChip,
  onAnimationCompleted,
}) => {
  const form = useFormContext();

  const tieWager = form.watch("tieWager");

  const bankerWager = form.watch("bankerWager");

  const playerWager = form.watch("playerWager");

  const [isTieWon, setIsTieWon] = React.useState<boolean>(false);

  const [isBankerWon, setIsBankerWon] = React.useState<boolean>(false);

  const [isPlayerWon, setIsPlayerWon] = React.useState<boolean>(false);

  const setWinner = (bankerCount: number, playerCount: number) => {
    bankerCount === playerCount && setIsTieWon(true);

    bankerCount > playerCount && setIsBankerWon(true);

    playerCount > bankerCount && setIsPlayerWon(true);

    setTimeout(() => {
      setIsTieWon(false);

      setIsBankerWon(false);

      setIsPlayerWon(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        "absolute left-1/2 top-[-450px] mx-auto h-[900px] w-[900px] -translate-x-1/2",
        styles.baccaratScene
      )}
    >
      <div className="absolute h-full w-full rounded-full border-2 border-[#396c4c] bg-[#1c5032]">
        {/* tie background */}
        <div className="absolute left-1/2 top-1/2 z-[3] h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#11331E]">
          <img
            width={1400}
            height={600}
            className="absolute bottom-0 left-0 max-h-[600px] max-w-[1400px] select-none object-cover object-center"
            src={`${CDN_URL}/baccarat/table-effect.png`}
            alt="JustBet Baccarat"
          />
        </div>
        {/* banker background */}
        <div className="absolute left-1/2 top-1/2 z-[2] h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#174128]">
          <img
            width={1400}
            height={600}
            className="absolute bottom-0 left-0 max-h-[600px] max-w-[1400px] select-none object-cover object-center"
            src={`${CDN_URL}/baccarat/table-effect.png`}
            alt="JustBet Baccarat"
          />
        </div>
        {/* player background */}
        <div className="absolute left-1/2 top-1/2 z-[1] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#11331E]">
          <img
            width={1400}
            height={600}
            className="absolute bottom-0 left-0 max-h-[600px] max-w-[1400px] select-none object-cover object-center"
            src={`${CDN_URL}/baccarat/table-effect.png`}
            alt="JustBet Baccarat"
          />
        </div>
        {/* center circle background */}
        <div className="absolute left-1/2 top-1/2 z-[4] h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#174128]">
          <img
            width={1400}
            height={600}
            className="absolute bottom-0 left-0 max-h-[600px] max-w-[1400px] select-none object-cover object-center"
            src={`${CDN_URL}/baccarat/table-effect.png`}
            alt="JustBet Baccarat"
          />
        </div>

        {/* bet area */}
        <div className={styles.betArea}>
          <div className={styles.pie}>
            <div
              onClick={() => addWager(selectedChip, BaccaratBetType.TIE)}
              className={cn(
                styles.zone,
                isTieWon && styles.tieWinner,
                isDisabled &&
                  "pointer-events-none cursor-default overflow-hidden",
                "!z-[3] bg-[#11331E]"
              )}
            >
              <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-col text-center text-xl font-bold">
                <span className="text-white">Tie</span>
                <span className="text-sm font-normal">Pays 8 to 1</span>
              </div>

              <div className="absolute bottom-[8%] left-1/2 z-[1] flex -translate-x-1/2">
                {renderChipIcon(tieWager)}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                  {tieWager ? tieWager : ""}
                </span>
              </div>

              <img
                width={1400}
                height={600}
                className="absolute left-0 top-0 z-0 h-full max-h-full w-full max-w-full select-none rounded-full"
                src={`${CDN_URL}/baccarat/table-effect.png`}
                alt="JustBet Baccarat"
              />
            </div>

            <div
              onClick={() => addWager(selectedChip, BaccaratBetType.BANKER)}
              className={cn(
                styles.zone,
                isBankerWon && styles.winner,
                isDisabled && "pointer-events-none cursor-default",
                "!z-[2] !h-3/4 !w-3/4 bg-[#174128]"
              )}
            >
              <div className="absolute bottom-[7%] left-1/2 flex -translate-x-1/2 flex-col text-center text-xl font-bold">
                <span className="text-white">Banker</span>
              </div>

              <div className="absolute bottom-[7%] left-1/2 z-[1] flex -translate-x-1/2">
                {renderChipIcon(bankerWager)}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                  {bankerWager ? bankerWager : ""}
                </span>
              </div>

              <img
                width={1400}
                height={600}
                className="absolute left-0 top-0 h-full max-h-full w-full max-w-full select-none rounded-full"
                src={`${CDN_URL}/baccarat/table-effect.png`}
                alt="JustBet Baccarat"
              />
            </div>

            <div
              onClick={() => addWager(selectedChip, BaccaratBetType.PLAYER)}
              className={cn(
                styles.zone,
                isPlayerWon && styles.winner,
                isDisabled && "pointer-events-none cursor-default",
                "!z-[1] !h-full !w-full bg-[#11331E]"
              )}
            >
              <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 flex-col text-center text-xl font-bold">
                <span className="text-white">Player</span>
              </div>

              <div className="absolute bottom-[5%] left-1/2 z-[1] flex -translate-x-1/2">
                {renderChipIcon(playerWager)}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                  {playerWager ? playerWager : ""}
                </span>
              </div>

              <img
                width={1400}
                height={600}
                className="absolute left-0 top-0 h-full max-h-full w-full max-w-full select-none rounded-full"
                src={`${CDN_URL}/baccarat/table-effect.png`}
                alt="JustBet Baccarat"
              />
            </div>

            <div className="absolute left-1/2 top-3/4 z-[3] h-1/2 w-[5px] -translate-x-1/2 -translate-y-1/2 bg-[#396C4C]" />
            <div className="absolute left-[24%] top-[65%] z-[3] h-[9.5px] w-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] bg-[#396C4C]" />
          </div>
        </div>
        {/* bet area end */}
        <CardArea
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          hands={baccaratResults}
          baccaratSettled={baccaratSettled}
          setWinner={setWinner}
          onAnimationCompleted={onAnimationCompleted}
        />
      </div>
    </div>
  );
};
