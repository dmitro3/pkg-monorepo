import { UseFormReturn } from "react-hook-form";

export type Plinko3dForm = UseFormReturn<
  {
    wager: number;
    betCount: number;
    stopGain: number;
    stopLoss: number;
    plinkoSize: number;
  },
  any,
  undefined
>;
