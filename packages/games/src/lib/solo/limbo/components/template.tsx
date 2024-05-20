import React from "react";
import { Form } from "../../../ui/form";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { BetController } from "./bet-controller";
import { Limbo, LimboFormField } from "..";
import { LimboGameProps } from "./game";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = LimboGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onSubmitGameForm: (props: LimboFormField) => void;
};

const LimboTemplate = ({ ...props }: TemplateProps) => {
  const options = { ...props.options };

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
      .min(1, { message: "Minimum bet count is 1" })
      .max(100, {
        message: "Maximum bet count is 100",
      }),
    stopGain: z.number(),
    stopLoss: z.number(),
    limboMultiplier: z.number().min(1.1).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "all",
    defaultValues: {
      wager: 2,
      betCount: 1,
      stopGain: 0,
      stopLoss: 0,
      limboMultiplier: 1.1,
    },
  });

  const multiplier = form.watch("limboMultiplier");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmitGameForm)}>
        <GameContainer>
          <BetController
            maxWager={props?.maxWager || 10}
            minWager={props?.minWager || 2}
            winMultiplier={multiplier}
          />
          <SceneContainer
            className="wr-h-[790px] wr-overflow-hidden !wr-p-0"
            style={{
              backgroundImage: options?.scene?.backgroundImage,
            }}
          >
            <Limbo.Game {...props}>
              <Limbo.GameArea {...props}>
                <Limbo.LastBets />
                <Limbo.ResultAnimation />
                <Limbo.Slider />
              </Limbo.GameArea>
            </Limbo.Game>
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default LimboTemplate;
