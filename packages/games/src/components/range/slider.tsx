// import React from "react";
// import * as Slider from "@radix-ui/react-slider";
// import { useFormContext } from "react-hook-form";
// import { RangeForm } from "../../_constants";
// import { FormControl, FormField, FormItem } from "@/components/ui/form";
// import { cn } from "@jb/ui";

// const MIN_VALUE = 5;

// const MAX_VALUE = 95;

// interface RangeSliderProps {
//   disabled?: boolean;
// }

// const RangeSlider: React.FC<RangeSliderProps> = ({ disabled = false }) => {
//   const form = useFormContext() as RangeForm;

//   const rollValue = form.watch("rollValue");

//   const rollType = form.watch("rollType");

//   return (
//     <div className="w-full shrink-0">
//       <FormField
//         control={form.control}
//         name="rollValue"
//         render={({ field }) => (
//           <FormItem className="mb-0">
//             <FormControl>
//               <Slider.Root
//                 className={cn(
//                   "relative flex h-6 cursor-pointer touch-none select-none items-center ",
//                   {
//                     "cursor-not-allowed":
//                       form.formState.isSubmitting || form.formState.isLoading,
//                   }
//                 )}
//                 defaultValue={[rollValue]}
//                 min={MIN_VALUE}
//                 max={MAX_VALUE}
//                 onValueChange={(e) => {
//                   field.onChange(e[0]);

//                   const { rollType } = form.getValues();

//                   const newValue = rollType === "UNDER" ? e[0] : 100 - e[0];

//                   form.setValue("winChance", newValue, {
//                     shouldValidate: true,
//                   });
//                 }}
//                 step={0.01}
//                 value={rollValue <= MAX_VALUE ? [rollValue] : [MAX_VALUE]}
//                 disabled={
//                   form.formState.isSubmitting || form.formState.isLoading
//                 }
//               >
//                 <Slider.Track
//                   className={cn(
//                     "relative h-6 grow rounded-sm bg-zinc-400 transition-all duration-300 ease-linear",
//                     {
//                       "bg-lime-600": rollType === "OVER",
//                     }
//                   )}
//                 >
//                   <Slider.Range
//                     className={cn(
//                       "absolute h-full rounded-sm  bg-lime-600 transition-all duration-300 ease-linear",
//                       {
//                         "bg-zinc-400": rollType === "OVER",
//                       }
//                     )}
//                   />
//                 </Slider.Track>
//                 <Slider.Thumb
//                   className="relative  grid h-16 w-16  place-items-center rounded-[10px] bg-gradient-to-b from-white to-[#C5C5CC] shadow-[0_1px_5px] focus:shadow-[0_2px_10px] focus:outline-none focus:ring-0"
//                   aria-label="Volume"
//                 >
//                   <div className="absolute -top-[50px] text-4xl font-bold">
//                     {rollValue <= MAX_VALUE ? rollValue : MAX_VALUE}
//                   </div>
//                   <div className="flex gap-[6px]">
//                     <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
//                     <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
//                     <div className="h-[34px] w-[6px] rounded-[2px] bg-zinc-400" />
//                   </div>
//                 </Slider.Thumb>
//               </Slider.Root>
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <div className="mt-[22px] flex justify-between text-[15px] font-bold">
//         <span>{MIN_VALUE}</span>
//         <span>{MAX_VALUE}</span>
//       </div>
//     </div>
//   );
// };

// export default RangeSlider;
