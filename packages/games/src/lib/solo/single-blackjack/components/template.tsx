"use client";

import { SingleBlackjackGameProps } from "..";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { cn } from "../../../utils/style";
import { BetController } from "./bet-controller";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../../ui/form";

type TemplateOptions = {
  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = SingleBlackjackGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
};

const SingleBlackjackTemplate: React.FC<TemplateProps> = ({
  minWager,
  maxWager,

  options,

  onDeal,
}) => {
  const formSchema = z.object({
    wager: z
      .number()
      .min(minWager || 2, {
        message: `Minimum wager is ${minWager}`,
      })
      .max(maxWager || 2000, {
        message: `Maximum wager is ${maxWager}`,
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "onSubmit",
    defaultValues: {
      wager: minWager || 2,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onDeal)}>
        <GameContainer>
          <BetController minWager={minWager || 2} maxWager={maxWager || 1000} />
          <SceneContainer
            className={cn(
              "wr-h-[640px] max-md:wr-h-[425px] lg:wr-py-12 wr-relative"
            )}
            style={{
              backgroundImage: options?.scene?.backgroundImage,
            }}
          >
            scene
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default SingleBlackjackTemplate;
