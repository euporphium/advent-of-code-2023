import getLines from './util/getLines.js';

const lines = await getLines(4);

function solvePart1() {
  return lines.reduce((acc, line) => {
    const [_, tmp] = line.split(':');
    const [w, o] = tmp.split('|');
    const winning = w.trim().split(/\s+/);
    const owned = new Set(o.trim().split(/\s+/));

    const intersect = new Set(winning.filter((i) => owned.has(i)));
    const points = intersect.size > 0 ? 2 ** (intersect.size - 1) : 0;
    return acc + points;
  }, 0);
}

function solvePart2() {
  const cardCounts = new Array(lines.length).fill(1);

  lines.forEach((line, i) => {
    const [_, tmp] = line.split(':');
    const [w, o] = tmp.split('|');
    const winning = w.trim().split(/\s+/);
    const owned = new Set(o.trim().split(/\s+/));

    const winCount = new Set(winning.filter((i) => owned.has(i))).size;

    for (let n = 0; n < winCount; n++) {
      const key = i + n + 1;
      cardCounts[key] = cardCounts[key] + cardCounts[i];
    }
  });

  return cardCounts.reduce((acc, count) => acc + count, 0);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
