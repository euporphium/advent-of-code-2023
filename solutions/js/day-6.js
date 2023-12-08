import getLines from './util/getLines.js';

const lines = await getLines(6);

function countWinners(time, distance) {
  let losses = 0;
  let held = 1;
  while (held * (time - held) < distance) {
    losses++;
    held++;
  }
  return time - losses * 2 - 1;
}

function solvePart1(countWinners) {
  const [t, d] = lines.map((line) => line.split(':')[1].trim().split(/\s+/));
  return t.reduce((acc, time, i) => {
    return acc * countWinners(parseInt(time), parseInt(d[i]));
  }, 1);
}

function solvePart2() {
  const [t, d] = lines.map((line) => line.split(':')[1].replace(/\s+/g, ''));
  return countWinners(parseInt(t), parseInt(d));
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
