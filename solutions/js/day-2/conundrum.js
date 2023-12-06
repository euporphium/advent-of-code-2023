import { promises as fs } from 'fs';

// const input = await fs.readFile('../../../input/day-2/example.txt', 'utf8');
const input = await fs.readFile('../../../input/day-2/challenge.txt', 'utf8');

// Part 1
// const max = {
//     red: 12,
//     green: 13,
//     blue: 14
// }

// const solution = input.split(/\r?\n/).reduce((acc, line) => {
//     const gameId = +line.split(':')[0].split(' ')[1];

//     let valid = line.split(':')[1].split(';').map(game => game.split(',').map(dice => {
//         const color = dice.trim().split(' ')[1];
//         const count = +dice.trim().split(' ')[0];
//         return count <= max[color];
//     }).every(dice => dice === true)).every(game => game === true);

//     return valid ? acc + gameId: acc;
// }, 0);

// Part 2

const solution = input.split(/\r?\n/).reduce((acc, line) => {
    const gameId = +line.split(':')[0].split(' ')[1];
    const maxFound = { red: 0,green: 0,blue: 0 }

    line.split(':')[1].split(';').forEach(game => {
        const dice =  game.split(',').map(dice => {
            const [value, key] = dice.trim().split(' ');
            if (+value > maxFound[key]) {
                maxFound[key] = +value;
            }
        });
    });

    return maxFound.blue * maxFound.green * maxFound.red + acc;

}, 0);

console.log(solution);