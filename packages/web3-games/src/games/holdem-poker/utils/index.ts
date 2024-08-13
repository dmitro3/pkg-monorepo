import { Combination } from '@winrlabs/games';

export const checkPairOfAcesOrBetter = (drawnCards: number[]): Combination => {
  let allCards = [
    drawnCards[0],
    drawnCards[1],
    drawnCards[4],
    drawnCards[5],
    drawnCards[6],
  ] as number[];

  const suits = [];

  const values = [];

  allCards = insertionSortByValueFive(allCards);

  // Split suits and _values
  for (let i = 0; i < 5; i++) {
    suits[i] = (allCards[i] as number) / 100;

    values[i] = (allCards[i] as number) % 100;
  }

  const winningCombination1 = checkFlushesAndStraightsFive(values, suits);

  if (
    winningCombination1 == Combination.ROYAL_FLUSH ||
    winningCombination1 == Combination.STRAIGHT_FLUSH ||
    winningCombination1 == Combination.FLUSH ||
    winningCombination1 == Combination.STRAIGHT
  )
    return winningCombination1;

  const winningCombination2 = checkPairsAndFullHouseFive(values);

  return winningCombination2;
};

const insertionSortByValueFive = (cards: number[]): number[] => {
  // Create a new array to store the values
  const values = [] as any;

  for (let i = 0; i < 5; i++) {
    values[i] = (cards[i] as number) % 100;
  }

  // Iterate over the array starting from the second element
  for (let i = 1; i < 5; i++) {
    // Store the current element
    const _key = values[i] as number;

    const _keyCard = cards[i] as number;

    let j = i;
    // Shift elements of _arr[0..i-1] that are greater than key_ to one position ahead of their current position

    while (j > 0 && values[j - 1] > _key) {
      values[j] = values[j - 1];

      cards[j] = cards[j - 1] as number;

      j--;
    }

    // Insert the current element at the correct position
    values[j] = _key;

    cards[j] = _keyCard;
  }

  return cards;
};

const checkFlushesAndStraightsFive = (values: number[], types: number[]): Combination => {
  // Count occurrences of each suit
  const suitCounts: number[] = [];

  for (let i = 0; i < 5; i++) {
    suitCounts[(types[i] as number) - 1]++;
  }

  // Check for flushes
  for (let x = 0; x < 4; x++) {
    const amountOfSuit = suitCounts[x];

    if (amountOfSuit == 5) {
      // When all five cards are in the same suit, it means the cards (values) can be used as the hand directly as a FLUSH hand. The values are pre-sorted.
      // flushes cannot have duplicates, so we do not have to worry about that
      if (isSequentialStraightFive(values)) {
        if (values[4] == 14) {
          // it could either be a royal flush or a straight flush
          if (values[3] == 13) {
            return Combination.ROYAL_FLUSH;
          } else {
            return Combination.STRAIGHT_FLUSH;
          }
        }
      }

      // If no Straight Flush or Royal Flush, it's a normal Flush
      return Combination.FLUSH;
    }
  }

  return 0;
};

const isSequentialStraightFive = (values: number[]): boolean => {
  // Special case for low straight (Ace to 5)
  if (values[0] == 2 && values[1] == 3 && values[2] == 4 && values[3] == 5 && values[4] == 14) {
    // since there are only 5 cards the cards must be sorted this way
    return true;
  }

  for (let i = 4; i > 0; --i) {
    if (values[i] != (values[i - 1] as number) + 1) {
      return false;
    }
  }

  return true;
};

const checkPairsAndFullHouseFive = (values: number[]): Combination => {
  let currentCount = 1;

  let previousValue = values[0] as number;

  let firstPairValue = 0;

  let secondPairValue = 0;

  let threeOfAKindValue = 0;

  let fourOfAKindValue = 0;

  for (let i = 1; i < 5; ++i) {
    if (values[i] == previousValue) {
      currentCount++;
    } else {
      const [_firstPairValue, _secondPairValue, _threeOfAKindValue, _fourOfAKindValue] =
        updateCounts(
          currentCount,
          previousValue,
          firstPairValue,
          secondPairValue,
          threeOfAKindValue,
          fourOfAKindValue
        );

      firstPairValue = _firstPairValue as number;

      secondPairValue = _secondPairValue as number;

      threeOfAKindValue = _threeOfAKindValue as number;

      fourOfAKindValue = _fourOfAKindValue as number;

      currentCount = 1;

      previousValue = values[i] as number;
    }
  }

  // Update counts for the last set of identical _values
  const [_firstPairValue, _secondPairValue, _threeOfAKindValue, _fourOfAKindValue] = updateCounts(
    currentCount,
    previousValue,
    firstPairValue,
    secondPairValue,
    threeOfAKindValue,
    fourOfAKindValue
  );

  firstPairValue = _firstPairValue as number;

  secondPairValue = _secondPairValue as number;

  threeOfAKindValue = _threeOfAKindValue as number;

  fourOfAKindValue = _fourOfAKindValue as number;

  let combination = Combination.NONE;

  // Check for four of a kind
  if (fourOfAKindValue > 0) {
    combination = Combination.FOUR_OF_A_KIND;

    return combination;
  }

  // Check for full house, in case of 5 card there only can be 1 three of a kind
  if (threeOfAKindValue > 0 && firstPairValue > 0 && firstPairValue != threeOfAKindValue) {
    combination = Combination.FULL_HOUSE;

    return combination;
  }

  // Check for three of a kind
  if (threeOfAKindValue > 0) {
    combination = Combination.THREE_OF_A_KIND;

    return combination;
  }

  // Check for two pair
  if (secondPairValue > 0) {
    combination = Combination.TWO_PAIR;

    return combination;
  }

  // Check for one pair (must be a pair of aces or better)
  if (firstPairValue > 0) {
    if (firstPairValue == 14) {
      // only pair of aces or better counts as a pair for the side bet
      combination = Combination.ACE_PAIR;

      return combination;
    } else {
      // player has any other pair
      // CHECK!!
      combination = Combination.PAIR;

      return combination;
    }
  }

  // returning: Combination.NONE;
  return combination; // No relevant combination found
};

const updateCounts = (
  currentCount: number,
  value: number,
  firstPairValue: number,
  secondPairValue: number,
  threeOfAKindValue: number,
  fourOfAKindValue: number
) => {
  if (currentCount == 4) {
    fourOfAKindValue = value;
  } else if (currentCount == 3) {
    // check if there is already a three of a kind
    if (threeOfAKindValue == 0) {
      threeOfAKindValue = value;
    } else {
      // if there is already a three of a kind, then it is a full house
      // the highest 3 of a kind must be the three of a kind, the highest pair must be the first pair
      firstPairValue = threeOfAKindValue;

      threeOfAKindValue = value;
    }
  } else if (currentCount == 2) {
    if (firstPairValue == 0) {
      // if there is no first pair, then this is the first pair
      firstPairValue = value;
    } else if (secondPairValue == 0) {
      secondPairValue = value;
      // check if second pair is higher than first pair
    } else {
      // if there is already 2 pairs, then it could be a third pair
      firstPairValue = secondPairValue;

      secondPairValue = value;
      // check if second pair is higher than first pair
    }
  }

  return [firstPairValue, secondPairValue, threeOfAKindValue, fourOfAKindValue];
};
