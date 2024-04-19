import { cn } from "@winrlabs/ui";
import { GameContainer, SceneContainer } from "../../common/containers";
import { RangeGameProps } from "./game";
import { Dice } from "./index";
import { SliderTrackOptions } from "./slider";

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

  return (
    <GameContainer>
      <SceneContainer
        className={cn("h-[640px]  max-md:h-[425px] lg:py-12")}
        style={{
          backgroundImage: options?.scene?.backgroundImage,
        }}
      >
        <Dice.Game {...props}>
          <Dice.Body>
            <Dice.TextRandomizer />
            <Dice.Slider track={options?.slider?.track} />
          </Dice.Body>
          <Dice.Controller winMultiplier={32} />
        </Dice.Game>
      </SceneContainer>
    </GameContainer>
  );
};

export default DiceTemplate;
