import { BetControllerContainer } from "../../../common/containers";
import { BetControllerTitle, WagerFormField } from "../../../common/controller";
import { PreBetButton } from "../../../common/pre-bet-button";
import { Button } from "../../../ui/button";

interface Props {
  minWager: number;
  maxWager: number;
}

export const BetController: React.FC<Props> = ({ minWager, maxWager }) => {
  return (
    <BetControllerContainer>
      <div className="wr-max-lg:flex wr-max-lg:flex-col">
        <div className="wr-mb-3">
          <BetControllerTitle>Blackjack</BetControllerTitle>
        </div>

        <WagerFormField
          minWager={minWager}
          maxWager={maxWager}
          isDisabled={false}
        />

        <PreBetButton>
          <div className="wr-mb-3 wr-grid wr-grid-cols-2 wr-grid-rows-2 wr-gap-2">
            <Button variant="secondary" size="xl">
              Hit
            </Button>
            <Button variant="secondary" size="xl">
              Stand
            </Button>
            <Button variant="secondary" size="xl">
              Split
            </Button>
            <Button variant="secondary" size="xl">
              Double
            </Button>
          </div>
          <Button variant="success" size="xl">
            Deal
          </Button>
        </PreBetButton>
      </div>
    </BetControllerContainer>
  );
};
