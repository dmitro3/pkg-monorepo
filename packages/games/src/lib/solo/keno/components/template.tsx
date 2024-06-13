"use client";

import z from "zod";
import useMediaQuery from "../../../hooks/use-media-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../ui/form";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { Keno } from "..";

export function KenoTemplate({ ...props }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const formSchema = z.object({
    wager: z
      .number()
      .min(props?.minWager || 2, {
        message: `Minimum wager is ${props?.minWager}`,
      })
      .max(props?.maxWager || 2000, {
        message: `Maximum wager is ${props?.maxWager}`,
      }),
    betCount: z.number().min(1, { message: "Minimum bet count is 1" }).max(3, {
      message: "Maximum bet count is 3",
    }),
    selections: z.array(z.number()),
    stopGain: z.number(),
    stopLoss: z.number(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "onSubmit",
    defaultValues: {
      wager: 2,
      betCount: 1,
      stopGain: 0,
      stopLoss: 0,
      selections: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.gamesubmit)}>
        <GameContainer>
          <Keno.Controller
            maxWager={props?.maxWager || 10}
            minWager={props?.minWager || 2}
          />
          <SceneContainer className="wr-relative sm:wr-h-[790px] lg:wr-px-[14px] lg:wr-pb-[14px]">
            <Keno.Scene />
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
}
