import { cn } from "@winrlabs/ui";
import { GameContainer, SceneContainer } from "../../common/containers";
import { RangeGameProps } from "./game";
import { Dice } from "./index";
import { SliderTrackOptions } from "./slider";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAX_BET_COUNT, MIN_BET_COUNT } from "./_constants";
import { Form } from "@winrlabs/ui";
import { BetController } from "./bet-controller";

type TemplateOptions = {
  slider?: {
    track?: SliderTrackOptions;
  };

  scene?: {
    backgroundImage?: string;
  };
};

type TemplateProps = RangeGameProps & {
  options: TemplateOptions;
  minWager?: number;
  maxWager?: number;
  onSubmit: (data: any) => void;
};

const defaultOptions: TemplateOptions = {
  slider: {
    track: {
      color: "#a1a1aa",
      activeColor: "#65a30d",
    },
  },
};

const DiceTemplate = ({ ...props }: TemplateProps) => {
  const options = { ...defaultOptions, ...props.options };

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
    rollValue: z.number().min(5).max(95),
    rollType: z.enum(["OVER", "UNDER"]),
    winChance: z.number().min(5).max(95),
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
      rollType: "OVER",
      rollValue: 50,
      winChance: 50,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <GameContainer>
          <BetController
            minWager={props.minWager || 2}
            maxWager={props.maxWager || 10}
            winMultiplier={32}
          />
          <SceneContainer
            className={cn("h-[640px]  max-md:h-[425px] lg:py-12")}
            style={{
              backgroundImage: options?.scene?.backgroundImage,
            }}
          >
            <Dice.Game {...props}>
              {/* last bets */}
              <div />
              <Dice.Body>
                <Dice.TextRandomizer />
                <Dice.Slider track={options?.slider?.track} />
              </Dice.Body>
              <Dice.Controller winMultiplier={32} />
            </Dice.Game>
          </SceneContainer>
        </GameContainer>
      </form>
    </Form>
  );
};

export default DiceTemplate;
