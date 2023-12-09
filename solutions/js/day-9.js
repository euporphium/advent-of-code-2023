import getLines from './util/getLines.js';

const lines = await getLines(9);

const allEqual = (arr) => arr.every((v) => v === arr[0]);

function solvePart1() {
  return lines.reduce((acc, l) => {
    const line = l.split(' ').map((n) => parseInt(n, 10));

    function addNextValue(arr) {
      let last = arr.at(-1);
      if (allEqual(last)) {
        for (let i = arr.length - 1; i > 0; i--) {
          arr[i - 1].push(arr[i - 1].at(-1) + arr[i].at(-1));
        }
        return arr[0];
      }

      let curr = [];
      for (let i = 0; i < last.length - 1; i++) {
        curr.push(last[i + 1] - last[i]);
      }
      arr.push(curr);

      return addNextValue(arr);
    }

    const withNext = addNextValue([line]);

    return acc + withNext.at(-1);
  }, 0);
}

function solvePart2() {
  return lines.reduce((acc, l) => {
    const line = l.split(' ').map((n) => parseInt(n, 10));

    function addPrevValue(arr) {
      let last = arr.at(-1);
      if (last[0] === 0 && allEqual(last)) {
        for (let i = arr.length - 1; i > 0; i--) {
          arr[i - 1].unshift(arr[i - 1][0] - arr[i][0]);
        }
        return arr[0];
      }

      let curr = [];
      for (let i = 0; i < last.length - 1; i++) {
        curr.push(last[i + 1] - last[i]);
      }
      arr.push(curr);

      return addPrevValue(arr);
    }

    const withPrev = addPrevValue([line]);

    return acc + withPrev[0];
  }, 0);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
