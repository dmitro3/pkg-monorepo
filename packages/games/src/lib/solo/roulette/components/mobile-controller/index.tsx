import { useFormContext } from "react-hook-form";

import { CDN_URL } from "../../../../constants";
import {
  SoundEffects,
  useAudioEffect,
} from "../../../../hooks/use-audio-effect";
import { Button } from "../../../../ui/button";
import { NUMBER_INDEX_COUNT } from "../../constants";
import { RouletteForm } from "../../types";

export const MobileController: React.FC<{
  undoBet: () => void;
  isPrepared: boolean;
}> = ({ undoBet, isPrepared }) => {
  const digitalClickEffect = useAudioEffect(SoundEffects.BUTTON_CLICK_DIGITAL);
  const form = useFormContext() as RouletteForm;
  return (
    <div className="wr-absolute wr-bottom-0 wr-left-0 wr-flex lg:wr-hidden wr-w-full wr-items-between">
      <Button
        type="button"
        disabled={isPrepared || form.getValues().totalWager === 0}
        onClick={() => {
          undoBet();
          digitalClickEffect.play();
        }}
        variant="ghost"
        size="xl"
        className="wr-flex wr-w-full wr-items-center wr-gap-1 wr-justify-start"
      >
        <img
          src={`${CDN_URL}/icons/icon-undo.svg`}
          width={20}
          height={20}
          alt="Justbet Decentralized Casino"
        />
        <span>Undo</span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="xl"
        className="wr-flex wr-w-full wr-items-center wr-gap-1 wr-justify-end"
        disabled={isPrepared}
        onClick={() => {
          digitalClickEffect.play();
          form.setValue(
            "selectedNumbers",
            new Array(NUMBER_INDEX_COUNT).fill(0)
          );
        }}
      >
        <img
          src={`${CDN_URL}/icons/icon-trash.svg`}
          width={20}
          height={20}
          alt="Justbet Decentralized Casino"
        />
        <span>Clear</span>
      </Button>
    </div>
  );
};
