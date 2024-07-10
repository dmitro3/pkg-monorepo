import { Multiplier } from "../../constants";
import { cn } from "../../../../utils/style";
import { Avatar, Wheel } from "../../../../svgs";
import { Separator } from "../../../../ui/separator";
import { useWheelGameStore } from "../../store";
import { useMemo } from "react";

const color = {
  gray: " wr-bg-[#ffffff15] ",
  yellow: "wr-bg-[#FACC1525]",
  blue: "wr-bg-[#3B82F625]",
  green: "wr-bg-[#84CC1625]",
  red: "wr-bg-[#DC262625]",
};

const iconColor = {
  gray: "wr-text-white ",
  yellow: "wr-text-yellow-500",
  blue: "wr-text-blue-500",
  green: "wr-text-green-500",
  red: "wr-text-red-600",
};

interface WheelParticipantDetailProps {
  variant: "gray" | "yellow" | "blue" | "green" | "red";
  multiplier: Multiplier;
}

const WheelParticipantDetail: React.FC<WheelParticipantDetailProps> = ({
  variant,
  multiplier,
}) => {
  const { isParticipantsOpen, wheelParticipants } = useWheelGameStore([
    "isParticipantsOpen",
    "wheelParticipants",
  ]);

  const participants = useMemo(() => {
    const result = Object.entries(wheelParticipants[multiplier]).map(
      ([key, value]) => ({
        player: key,
        bet: value,
      })
    );

    if (result.length < 4) {
      const emptyParticipants = Array.from({ length: 4 - result.length }).map(
        () => ({
          player: "",
          bet: 0,
        })
      );

      return [...result, ...emptyParticipants];
    }

    return result;
  }, [multiplier, wheelParticipants]);

  return (
    <div className="wr-flex wr-flex-col">
      <div
        className={cn(
          "wr-mb-[5px] wr-flex wr-h-[118px] wr-w-[184px] wr-flex-col wr-justify-between wr-gap-[1.5px] wr-overflow-hidden wr-transition-all wr-duration-300 max-md:wr-hidden",
          {
            "wr-h-0": !isParticipantsOpen,
          }
        )}
      >
        {participants.map((participant, index) => (
          <div
            key={index}
            className={cn(
              "wr-flex wr-h-[28px] wr-w-[184px] wr-items-center wr-justify-between wr-rounded wr-rounded-tl-md wr-rounded-tr-md  wr-px-2.5 wr-text-[13px] wr-font-semibold ",
              color[variant]
            )}
          >
            <div className="wr-w-[54px] wr-truncate" title={participant.player}>
              {participant.player}
            </div>
            <div className="wr-flex">
              {participant.bet ? <>{participant.bet} USDC</> : null}
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "wr-flex wr-h-[40px] wr-w-[184px] wr-flex-row wr-items-center wr-justify-center wr-gap-1 wr-rounded-md wr-p-2  wr-text-[14px] wr-font-semibold ",
          color[variant]
        )}
      >
        <Wheel className={(cn("wr-h-5 wr-w-5"), iconColor[variant])} />
        <div>{multiplier}</div>
        <Separator className="wr-mx-2 " orientation="vertical" />
        <Avatar />
        <div>{Object.keys(wheelParticipants[multiplier]).length}</div>
      </div>
    </div>
  );
};

export default WheelParticipantDetail;
