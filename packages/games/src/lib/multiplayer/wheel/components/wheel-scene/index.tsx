// import React from "react";
// import { Wheel } from "./wheel";
// // import useWheelGameStore from "../../_store/game-info-store";
import { useState } from "react";
import {
  colorMultipliers,
  WheelColor,
  WheelStatus,
  WheelUnits,
} from "../../constants";
import styles from "./wheel-scene.module.css";
import { cn } from "../../../../utils/style";
import { CountdownProvider, Minutes, Seconds } from "../../../../ui/countdown";
import { Wheel } from "./wheel";
// import { WheelStatus, WheelUnits, colorMultipliers } from "../../constants";
// import { WheelColor } from "../../constants";
// import { cn } from "../../../../utils/style";
// import { CountdownProvider, Minutes, Seconds } from "../../../../ui/countdown";

// export const WheelScene = ({ onComplete }: { onComplete: () => void }) => {
//   // const { status, winnerAngle, winnerColor, startTime, updateState } =
//   //   useWheelGameStore([
//   //     "status",
//   //     "winnerAngle",
//   //     "winnerColor",
//   //     "startTime",
//   //     "updateState",
//   //   ]);
//   // TODO: for test purposes
//   let status: WheelStatus = WheelStatus.Idle;
//   const winnerAngle = 0;
//   const startTime = 0;

//   const [showResult, setShowResult] = React.useState(false);

//   // TODO: index is wheel color
//   const multiplier = colorMultipliers[WheelColor.BLUE];

//   // React.useEffect(() => {
//   //   console.log("status", status);

//   //   if (status === WheelStatus.Idle) {
//   //     setShowResult(false);
//   //   }
//   // }, [status]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.wheelContent}>
//         <div className={styles.status}>
//           {status === WheelStatus.Idle && (
//             <div className="wr-text-xl wr-leading-5 wr-text-zinc-100">
//               Bet to Start <br />
//               <span className="wr-text-base wr-leading-5 wr-text-zinc-500">
//                 The game will start after someone placeds a bet
//               </span>
//             </div>
//           )}

//           {status === WheelStatus.Idle && startTime > 0 && (
//             <section className="wr-text-center">
//               <div className="wr-mb-3 wr-text-xl wr-leading-5 wr-text-zinc-100">
//                 Remainingdsadsa time:
//               </div>
//               {/* <CountdownProvider
//                 targetDate={new Date(startTime * 1000)?.toISOString()}
//               >
//                 <section className="wr-mt-2 wr-flex wr-items-center wr-justify-center wr-gap-2">
//                   <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
//                     <Minutes />
//                   </div>
//                   <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
//                     :
//                   </div>
//                   <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
//                     <Seconds />
//                   </div>
//                 </section>
//               </CountdownProvider> */}
//             </section>
//           )}

//           {status === WheelStatus.Finished && showResult && (
//             <div className={cn(styles.multiplier, styles[`m${multiplier}x`])}>
//               <div className="wr-text-[32px]">{multiplier}x</div>
//             </div>
//           )}
//         </div>
//         <Wheel
//           units={WheelUnits}
//           spin={status === WheelStatus.Spin}
//           degree={status === WheelStatus.Finished ? winnerAngle : undefined}
//           onComplete={() => {
//             setShowResult(true);

//             onComplete && onComplete();
//           }}
//         />
//       </div>
//     </div>
//   );
// };

export const WheelScene = () => {
  const [showResult, setShowResult] = useState(false);
  const multiplier = colorMultipliers[WheelColor.BLUE];
  const startTime = 0;
  const status: WheelStatus = WheelStatus.Idle;
  const winnerAngle = 0;

  return (
    <div className={styles.container}>
      <div className={styles.wheelContent}>
        <div className={styles.status}>
          {status === WheelStatus.Idle && (
            <div className="wr-text-xl wr-leading-5 wr-text-zinc-100">
              Bet to Start <br />
              <span className="wr-text-base wr-leading-5 wr-text-zinc-500">
                The game will start after someone places a bet
              </span>
            </div>
          )}

          {status === WheelStatus.Idle && startTime > 0 && (
            <section className="wr-text-center">
              <div className="wr-mb-3 wr-text-xl wr-leading-5 wr-text-zinc-100">
                Remainingdsadsa time:
              </div>
              <CountdownProvider
                targetDate={new Date(startTime * 1000)?.toISOString()}
              >
                <section className="wr-mt-2 wr-flex wr-items-center wr-justify-center wr-gap-2">
                  <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
                    <Minutes />
                  </div>
                  <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
                    :
                  </div>
                  <div className="wr-text-[32px] wr-font-bold wr-leading-[32px] wr-text-white">
                    <Seconds />
                  </div>
                </section>
              </CountdownProvider>
            </section>
          )}

          {status === WheelStatus.Finished && showResult && (
            <div className={cn(styles.multiplier, styles[`m${multiplier}x`])}>
              <div className="wr-text-[32px]">{multiplier}x</div>
            </div>
          )}
        </div>
        <Wheel
          units={WheelUnits}
          spin={status === WheelStatus.Spin}
          degree={status === WheelStatus.Finished ? winnerAngle : undefined}
          onComplete={() => {
            setShowResult(true);

            onComplete && onComplete();
          }}
        />
      </div>
    </div>
  );
};
