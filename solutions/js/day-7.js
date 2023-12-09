import getLines from './util/getLines.js';
import { maxFrequency } from './util/array/maxFrequency.js';

const lines = await getLines(7);

function Cards(cardValues, options = { wildCard: '' }) {
  this.cardValues = cardValues;

  this.measureHand = function (hand) {
    const fiveOfAKind = hand.every((card) => card === hand[0]);
    if (fiveOfAKind) return 6;

    const fourOfAKind = hand.some(
      (card) => hand.filter((c) => c === card).length === 4,
    );
    if (fourOfAKind) return 5;

    const fullHouse =
      hand.some((card) => hand.filter((c) => c === card).length === 3) &&
      hand.some((card) => hand.filter((c) => c === card).length === 2);
    if (fullHouse) return 4;

    const threeOfAKind = hand.some(
      (card) => hand.filter((c) => c === card).length === 3,
    );
    if (threeOfAKind) return 3;

    const twoPair =
      hand.filter((card) => hand.filter((c) => c === card).length === 2)
        .length === 4;
    if (twoPair) return 2;

    const onePair = hand.some(
      (card) => hand.filter((c) => c === card).length === 2,
    );
    if (onePair) return 1;

    return 0;
  };

  this.breakTie = function (hand1, hand2) {
    for (let i = 0; i < hand1.length; i++) {
      const diff = this.cardValues[hand1[i]] - this.cardValues[hand2[i]];
      if (diff) return diff;
    }

    return 0;
  };

  this.maximizeHand = function (hand) {
    if (!hand.includes(options.wildCard)) return this.measureHand(hand);

    const mostFreq = maxFrequency(hand, (c) => c !== options.wildCard);
    const newHand = hand.map((c) => (c === options.wildCard ? mostFreq : c));
    return this.measureHand(newHand);
  };

  this.compareHands = function (hand1, hand2) {
    const diff = options.wildCard
      ? this.maximizeHand(hand1) - this.maximizeHand(hand2)
      : this.measureHand(hand1) - this.measureHand(hand2);
    return diff === 0 ? this.breakTie(hand1, hand2) : diff;
  };
}

function solvePart1() {
  const cards = new Cards({
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    T: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
  });

  return lines
    .map((line) => {
      const [hand, bid] = line.split(' ');
      return { hand: hand.split(''), bid: parseInt(bid) };
    })
    .sort((a, b) => cards.compareHands(a.hand, b.hand))
    .reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);
}

function solvePart2() {
  const cards = new Cards(
    {
      J: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
      9: 8,
      T: 9,
      Q: 10,
      K: 11,
      A: 12,
    },
    { wildCard: 'J' },
  );

  const sortedHands = lines
    .map((line) => {
      const [hand, bid] = line.split(' ');
      return { hand: hand.split(''), bid: parseInt(bid) };
    })
    .sort((a, b) => cards.compareHands(a.hand, b.hand));

  return sortedHands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
