import getLines from './util/getLines.js';

const lines = await getLines(2);

function solvePart1() {
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return lines.reduce((acc, line) => {
    const gameId = +line.split(':')[0].split(' ')[1];

    let valid = line
      .split(':')[1]
      .split(';')
      .map((game) =>
        game
          .split(',')
          .map((dice) => {
            const [count, color] = dice.trim().split(' ');
            return count <= max[color];
          })
          .every((dice) => dice === true),
      )
      .every((game) => game === true);

    return valid ? acc + gameId : acc;
  }, 0);
}

function solvePart2() {
  return lines.reduce((acc, line) => {
    const maxFound = { red: 0, green: 0, blue: 0 };

    line
      .split(':')[1]
      .split(';')
      .forEach((game) => {
        game.split(',').forEach((dice) => {
          const [value, key] = dice.trim().split(' ');
          if (+value > maxFound[key]) {
            maxFound[key] = +value;
          }
        });
      });

    return maxFound.blue * maxFound.green * maxFound.red + acc;
  }, 0);
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
