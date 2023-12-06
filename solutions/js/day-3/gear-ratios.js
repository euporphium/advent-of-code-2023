import getLines from '../util/getLines.js';

const lines = await getLines(3);

const isNumber = (value) => !isNaN(parseInt(value));

function solvePart1() {
  function isSymbol(l, p) {
    const isInRange =
      0 <= l && l < lines.length && 0 <= p && p < lines[l].length;
    return isInRange && lines[l][p] && lines[l][p] !== '.';
  }

  let solution = 0;
  for (let l = 0; l < lines.length; l++) {
    let found = '';

    for (let p = 0; p <= lines[l].length; p++) {
      const curr = lines[l][p];
      if (isNumber(curr)) {
        found += curr;
      } else {
        if (found.length > 0) {
          const leftBound = p - found.length - 1;
          if (isSymbol(l, leftBound) || isSymbol(l, p)) {
            solution += parseInt(found);
          } else {
            for (let x = leftBound; x <= p; x++) {
              if (isSymbol(l - 1, x) || isSymbol(l + 1, x)) {
                solution += parseInt(found);
                break;
              }
            }
          }
          found = '';
        }
      }
    }
  }

  return solution;
}

function solvePart2() {
  const gearMap = new Map();

  function search(l, p, part) {
    const key = `${l}-${p}`;
    const isInRange =
      0 <= l && l < lines.length && 0 <= p && p < lines[l].length;

    if (!isInRange) {
      return false;
    }

    if (lines[l][p] === '*') {
      if (gearMap.has(key)) {
        const { parts, count } = gearMap.get(key);
        gearMap.set(key, { parts: [...parts, part], count: count + 1 });
      } else {
        gearMap.set(key, { parts: [part], count: 1 });
      }
    }

    return isInRange && lines[l][p] !== '.';
  }

  for (let l = 0; l < lines.length; l++) {
    let found = '';

    for (let p = 0; p <= lines[l].length; p++) {
      const curr = lines[l][p];
      if (isNumber(curr)) {
        found += curr;
      } else {
        if (found.length > 0) {
          const leftBound = p - found.length - 1;
          search(l, leftBound, found);
          search(l, p, found);

          for (let x = leftBound; x <= p; x++) {
            search(l - 1, x, found);
            search(l + 1, x, found);
          }

          found = '';
        }
      }
    }
  }

  let sum = 0;
  for (const { parts, count } of gearMap.values()) {
    if (count === 2) {
      sum += parts[0] * parts[1];
    }
  }

  return sum;
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
