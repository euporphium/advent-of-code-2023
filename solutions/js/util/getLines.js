import { promises as fs } from 'fs';

export default async function getLines(day, file = 'challenge') {
  const input = await fs.readFile(`../../input/day-${day}/${file}.txt`, 'utf8');

  return input.split(/\r?\n/);
}
