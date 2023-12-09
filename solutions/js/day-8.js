import getLines from './util/getLines.js';
import { lcm } from './util/math.js';

const lines = await getLines(8);

const directions = lines[0].split('');

const map = {};
for (let i = 2; i < lines.length; i++) {
  const [key, tmp] = lines[i].split('=');
  const [left, right] = tmp.replace(/[,()]/g, '').trim().split(' ');
  map[key.trim()] = { left, right };
}

function distanceToTarget(key, isTarget) {
  let steps = 0;
  let current = key;
  let i = 0;
  while (!isTarget(current)) {
    steps++;
    const { left, right } = map[current];
    current = directions[i++ % directions.length] === 'R' ? right : left;
  }

  return steps;
}

function solvePart1() {
  return distanceToTarget('AAA', (l) => l === 'ZZZ');
}

function solvePart2() {
  return Object.keys(map)
    .filter((key) => key.endsWith('A'))
    .map((path) => distanceToTarget(path, (t) => t.endsWith('Z')))
    .reduce((acc, number) => lcm(acc, number), 1);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
