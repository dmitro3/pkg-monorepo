import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardStatus, VideoPokerFormFields } from "../types";
import useVideoPokerGameStore, { VideoPokerStatus } from "../store";
import { VideoPokerResult } from "../constants";
import { Form, FormField } from "../../../ui/form";
import { GameContainer, SceneContainer } from "../../../common/containers";
import { VideoPokerBetController } from "./bet-controller";
import { VideoPokerResults } from "./game-scene";
import { CardComponent } from "./game-scene/card";

interface TemplateProps {
  minWager?: number;
  maxWager?: number;
  isLoading: boolean;
  handleFinishGame: (data: VideoPokerFormFields) => Promise<void>;
  handleStartGame: (data: VideoPokerFormFields) => Promise<void>;
  onFormChange?: (fields: VideoPokerFormFields) => void;
}

const VideoPokerTemplate = ({
  minWager,
  maxWager,
  isLoading,
  handleFinishGame,
  handleStartGame,
}: TemplateProps) => {
  const [currentCards, setCurrentCards] = React.useState<any[]>(
    new Array(5).fill(0)
  );

  const { updateState, status } = useVideoPokerGameStore([
    "updateState",
    "status",
  ]);

  const formSchema = z.object({
    wager: z
      .number()
      .min(minWager || 1, {
        message: `Minimum wager is ${minWager || 1}`,
      })
      .max(maxWager || 2000, {
        message: `Maximum wager is ${maxWager || 2000}`,
      }),
    cardsToSend: z.array(z.nativeEnum(CardStatus)).length(5),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, {
      async: true,
    }),
    mode: "onSubmit",
    defaultValues: {
      wager: 2,
      cardsToSend: [
        CardStatus.CLOSED,
        CardStatus.CLOSED,
        CardStatus.CLOSED,
        CardStatus.CLOSED,
        CardStatus.CLOSED,
      ],
    },
  });

  const wager = form.watch("wager");

  const maxPayout = React.useMemo(() => {
    return wager * 100;
  }, [wager]);

  const handleSubmit = async (values: VideoPokerFormFields) => {
    updateState({
      status: VideoPokerStatus.Idle,
      gameResult: VideoPokerResult.LOST,
    });

    if (status === VideoPokerStatus.Active) {
      const mappedCards = values.cardsToSend
        .map((item) => (item === 0 ? 1 : 0))
        .reverse()
        .join("");

      const _cardsToSend = parseInt(mappedCards, 2);

      console.log("values", values.cardsToSend);

      await handleFinishGame(values);
    } else {
      await handleStartGame(values);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <GameContainer>
            <VideoPokerBetController
              maxPayout={maxPayout}
              maxWager={maxWager || 2000}
              minWager={minWager || 1}
            />
            <SceneContainer
              className="wr-relative wr-h-[640px] wr-justify-start wr-overflow-hidden lg:wr-pb-0 lg:wr-pt-0"
              style={{
                perspectiveOrigin: "bottom",
                perspective: "1000px",
              }}
            >
              <img
                src={"/images/video-poker/card-stack.png"}
                width={170}
                height={234}
                alt={"card_stack"}
                className="wr-mb-[68px]"
              />
              <VideoPokerResults />

              {isLoading ? (
                <>loading</>
              ) : (
                <>
                  <FormField
                    name="cardsToSend"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <React.Fragment>
                          <FormField
                            control={form.control}
                            name="cardsToSend"
                            render={({ field }) => {
                              return (
                                <React.Fragment>
                                  {currentCards?.map((card, i) => (
                                    <CardComponent
                                      card={card}
                                      index={i}
                                      key={i}
                                      field={field}
                                    />
                                  ))}
                                </React.Fragment>
                              );
                            }}
                          />
                        </React.Fragment>
                      );
                    }}
                  />
                </>
              )}
            </SceneContainer>
          </GameContainer>
        </form>
      </Form>
    </>
  );
};

export default VideoPokerTemplate;
