"use client";

import React from "react";
import { Card } from "../card";
import styles from "./dealer-card-area.module.css";
import { genNumberArray } from "../../../../utils/number";
import { BlackjackCard, calcTotalAmounts } from "../../utils";
import { cn } from "../../../../utils/style";
import { ActiveGameHands, BlackjackHandStatus, GameStruct } from "../..";
import { CDN_URL } from "../../../../constants";

interface DealerCardAreaProps {
  hand: ActiveGameHands["dealer"];
  uiCards: (BlackjackCard | null)[];
  activeGameData: GameStruct;
  isDistributionCompleted: boolean;
  isLastDistributionCompleted: boolean;
}

export const DealerCardArea: React.FC<DealerCardAreaProps> = ({
  uiCards,
  hand,
  activeGameData,
  isDistributionCompleted,
  isLastDistributionCompleted,
}) => {
  const { cards: cardData, handId, settledResult } = hand;

  const { activeHandIndex } = activeGameData;

  const [isCompletedAndBusted, setIsCompletedAndBusted] =
    React.useState<boolean>(false);

  const cardAmounts = React.useMemo(() => calcTotalAmounts(uiCards), [uiCards]);

  const isBusted = React.useMemo(() => {
    const handStatus = hand.hand?.status;

    if (!isDistributionCompleted) return false;

    if (cardAmounts.amount > 21) return true;

    if (handStatus === BlackjackHandStatus.BUST) return true;
    else return false;
  }, [isDistributionCompleted, hand.hand?.status, cardAmounts]);

  const isBlackjack = React.useMemo(() => {
    if (!isDistributionCompleted) return false;

    if (cardAmounts.amount === 21) return true;

    if (cardAmounts.softHandAmount === 21) return true;
    else return false;
  }, [isDistributionCompleted, cardAmounts]);

  React.useEffect(() => {
    if (isDistributionCompleted && isBusted) {
      setTimeout(() => setIsCompletedAndBusted(true), 3500);
    }
  }, [isDistributionCompleted, isBusted]);

  return (
    <div className={styles.dealerCardArea}>
      {genNumberArray(6).map((n) => (
        <Card
          key={n}
          className={cn({
            [styles[`card--${n + 1}`] as any]:
              uiCards[n] && !isCompletedAndBusted,
            [styles.busted as any]: uiCards[n] && isCompletedAndBusted,
          })}
          card={uiCards[n] as BlackjackCard}
          flipped={isCompletedAndBusted ? true : false}
        >
          {n === uiCards.length - 1 && isBusted && (
            <div className={styles.state}>
              <img
                src={`${CDN_URL}/blackjack/blackjack-lose.svg`}
                height={180}
                width={75}
                alt="JustBet Blackjack"
              />
            </div>
          )}

          {n === uiCards.length - 1 && isBlackjack && (
            <div className={styles.state}>
              <img
                src={`${CDN_URL}/blackjack/blackjack-win.svg`}
                height={180}
                width={75}
                alt="JustBet Blackjack"
              />
            </div>
          )}
        </Card>
      ))}

      {cardAmounts.amount > 0 ? (
        <div className={styles.cardAmount}>
          {cardAmounts.softHandAmount < 22 ? (
            cardData?.isSoftHand ? (
              <span>
                {cardAmounts.softHandAmount === 21
                  ? ""
                  : cardAmounts.amount + "/"}
                {cardAmounts.softHandAmount}
              </span>
            ) : (
              <span>{cardAmounts.amount}</span>
            )
          ) : (
            <span> {cardAmounts.amount} </span>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
