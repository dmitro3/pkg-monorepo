"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { Plinko3d } from "..";
import { UnityGameContainer } from "../../../common/containers";

const MIN_BET_COUNT = 1 as const;

const MAX_BET_COUNT = 100 as const;

export function PlinkoGame({ ...props }) {
  const [count, setCount] = React.useState(0);

  const [status, setStatus] = React.useState<"idle" | "playing" | "success">(
    "idle"
  );

  const formSchema = z.object({
    wager: z
      .number()
      .min(props?.minWager || 2, {
        message: `Minimum wager is ${props?.minWager}`,
      })

      .max(props?.maxWager || 2000, {
        message: `Maximum wager is ${props?.maxWager}`,
      }),
    betCount: z
      .number()
      .min(MIN_BET_COUNT, { message: "Minimum bet count is 1" })
      .max(MAX_BET_COUNT, {
        message: "Maximum bet count is 100",
      }),
    stopGain: z.number(),
    stopLoss: z.number(),
    plinkoSize: z.number().min(6).max(12),
  });

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
      plinkoSize: 10,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <UnityGameContainer className="flex overflow-hidden rounded-xl border border-zinc-800 max-lg:flex-col-reverse lg:h-[640px]">
          <Plinko3d.Game>
            <Plinko3d.BetController
              count={count}
              maxWager={props?.maxWager || 10}
              minWager={props?.minWager || 2}
              status={status}
              // winMultiplier={winMultiplier || 1}
            />
            <Plinko3d.LastBets />
            <Plinko3d.Scene
              count={count}
              setCount={setCount}
              status={status}
              setStatus={setStatus}
            />
            <div className="absolute top-0 z-10 h-full w-full" />
          </Plinko3d.Game>
        </UnityGameContainer>
      </form>
    </Form>
  );
}
