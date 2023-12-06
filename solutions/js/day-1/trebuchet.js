import getLines from '../util/getLines.js';

const lines = await getLines(1);

function solvePart1() {
  return lines.reduce((acc, line) => {
    return acc + parseInt(line.match(/\d/)[0] + line.match(/\d(?=\D*$)/)[0]);
  }, 0);
}

function solvePart2() {
  function cheatReplace(line) {
    return line
      .replaceAll('one', 'o1e')
      .replaceAll('two', 't2o')
      .replaceAll('three', 't3e')
      .replaceAll('four', 'f4r')
      .replaceAll('five', 'f5e')
      .replaceAll('six', 's6x')
      .replaceAll('seven', 's7n')
      .replaceAll('eight', 'e8t')
      .replaceAll('nine', 'n9e');
  }

  return lines.reduce((acc, line) => {
    const cheat = cheatReplace(line);
    return acc + parseInt(cheat.match(/\d/)[0] + cheat.match(/\d(?=\D*$)/)[0]);
  }, 0);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
