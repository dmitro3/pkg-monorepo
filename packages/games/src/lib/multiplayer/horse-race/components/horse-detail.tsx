import React from "react";
import { Avatar, Horse } from "../../../svgs";
import { Separator } from "../../../ui/separator";
import { cn } from "../../../utils/style";
import { Multiplier } from "../constants";
import useHorseRaceGameStore from "../store";

const color = {
  gray: " bg-zinc-400/60",
  yellow: "bg-yellow-600/60",
  blue: "bg-blue-600/60",
  green: "bg-green-500/60",
  red: "bg-red-600/60",
};

const iconColor = {
  gray: " text-white ",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-600",
};

interface HorseDetailProps {
  variant: "gray" | "yellow" | "blue" | "green" | "red";
  multiplier: Multiplier;
}

const HorseDetail: React.FC<HorseDetailProps> = ({ variant, multiplier }) => {
  const { isParticipantsOpen, selectedHorse } = useHorseRaceGameStore([
    "selectedHorse",
    "isParticipantsOpen",
  ]);

  const getHorseDetail = (multiplier: Multiplier, index: number) => {
    if (Array.isArray(selectedHorse[multiplier])) {
      if (selectedHorse[multiplier].length + 1 <= index) {
        return null;
      } else {
        return selectedHorse[multiplier][
          selectedHorse[multiplier].length - index
        ];
      }
    } else {
      return null;
    }
  };

  return (
    <div className="wr-flex">
      <div
        className={cn(
          "wr-mr-0.5 wr-flex wr-w-[140px] wr-flex-col wr-justify-between wr-overflow-hidden wr-transition-all wr-duration-300 wr-max-md:hidden",
          {
            "wr-w-0": !isParticipantsOpen,
          }
        )}
      >
        <div
          className={cn(
            "wr-flex wr-h-[28px] wr-w-[140px] wr-items-center wr-justify-between wr-rounded wr-rounded-tl-md wr-px-2.5 wr-text-[13px] wr-font-semibold",
            color[variant]
          )}
        >
          <div
            className="wr-w-[54px] wr-truncate"
            title={getHorseDetail(multiplier, 1)?.name}
          >
            {getHorseDetail(multiplier, 1)?.name}
          </div>
          <div className="wr-flex">
            {getHorseDetail(multiplier, 1)?.bet ? (
              <>
                {getHorseDetail(multiplier, 1)?.bet}
                <img
                  width={16}
                  height={16}
                  src="/images/tokens/usdc.png"
                  alt="usdc"
                  className="wr-ml-0.5 wr-shrink-0"
                />
              </>
            ) : null}
          </div>
        </div>
        <div
          className={cn(
            "wr-flex wr-h-[28px] wr-w-[140px] wr-items-center wr-justify-between wr-rounded wr-px-2.5 wr-text-[13px] wr-font-semibold",
            color[variant]
          )}
        >
          <div
            className="wr-w-[54px] wr-truncate"
            title={getHorseDetail(multiplier, 2)?.name}
          >
            {getHorseDetail(multiplier, 2)?.name}
          </div>
          <div className="wr-flex">
            {getHorseDetail(multiplier, 2)?.bet ? (
              <>
                {getHorseDetail(multiplier, 2)?.bet}
                <img
                  width={16}
                  height={16}
                  src="/images/tokens/usdc.png"
                  alt="usdc"
                  className="wr-ml-0.5 wr-shrink-0"
                />
              </>
            ) : null}
          </div>
        </div>
        <div
          className={cn(
            "wr-flex wr-h-[28px] wr-w-[140px] wr-items-center wr-justify-between wr-rounded wr-px-2.5 wr-text-[13px] wr-font-semibold",
            color[variant]
          )}
        >
          <div
            className="wr-w-[54px] wr-truncate"
            title={getHorseDetail(multiplier, 3)?.name}
          >
            {getHorseDetail(multiplier, 3)?.name}
          </div>
          <div className="wr-flex">
            {getHorseDetail(multiplier, 3)?.bet ? (
              <>
                {getHorseDetail(multiplier, 3)?.bet}
                <img
                  width={16}
                  height={16}
                  src="/images/tokens/usdc.png"
                  alt="usdc"
                  className="wr-ml-0.5 wr-shrink-0"
                />
              </>
            ) : null}
          </div>
        </div>
        <div
          className={cn(
            "wr-flex wr-h-[28px] wr-w-[140px] wr-items-center wr-justify-between wr-rounded wr-rounded-bl-md wr-px-2.5 wr-text-[13px] wr-font-semibold",
            color[variant]
          )}
        >
          <div
            className="wr-w-[54px] wr-truncate"
            title={getHorseDetail(multiplier, 4)?.name}
          >
            {getHorseDetail(multiplier, 4)?.name}
          </div>
          <div className="wr-flex">
            {getHorseDetail(multiplier, 4)?.bet ? (
              <>
                {getHorseDetail(multiplier, 4)?.bet}
                <img
                  width={16}
                  height={16}
                  src="/images/tokens/usdc.png"
                  alt="usdc"
                  className="wr-ml-0.5 wr-shrink-0"
                />
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "wr-flex wr-flex-row wr-items-center wr-gap-1 wr-rounded-md wr-p-2 wr-text-[14px] wr-font-semibold md:wr-w-10 md:wr-flex-col",
          color[variant]
        )}
      >
        <Horse className={cn("wr-h-5 wr-w-5", iconColor[variant])} />
        <div>{multiplier}</div>
        <Separator className="wr-my-2 wr-max-md:hidden" />
        <Separator className="wr-mx-2 md:wr-hidden" orientation="vertical" />
        <Avatar />
        <div>{selectedHorse[multiplier].length}</div>
      </div>
    </div>
  );
};

export default HorseDetail;
