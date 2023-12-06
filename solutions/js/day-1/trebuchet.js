import { promises as fs } from 'fs';

// const input = await fs.readFile('../../../input/day-1/example.txt', 'utf8');
// const input = await fs.readFile('../../../input/day-1/example2.txt', 'utf8');
const input = await fs.readFile('../../../input/day-1/challenge.txt', 'utf8');

// Part 1
// const solution = input.split(/\r?\n/).reduce((acc, line) => {
//     return acc + parseInt(line.match(/\d/)[0] + line.match(/\d(?=\D*$)/)[0]);
// }, 0);

// Part 2
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

const partTwoSolution = input.split(/\r?\n/).reduce((acc, line) => {
    const cheat = cheatReplace(line);
    return acc + parseInt(cheat.match(/\d/)[0] + cheat.match(/\d(?=\D*$)/)[0]);
}, 0);

console.log(partTwoSolution);