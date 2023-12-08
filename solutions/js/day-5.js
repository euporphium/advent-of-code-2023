import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import getLines from './util/getLines.js';

const SEED_TO_SOIL = 'seed-to-soil';
const SOIL_TO_FERTILIZER = 'soil-to-fertilizer';
const FERTILIZER_TO_WATER = 'fertilizer-to-water';
const WATER_TO_LIGHT = 'water-to-light';
const LIGHT_TO_TEMPERATURE = 'light-to-temperature';
const TEMPERATURE_TO_HUMIDITY = 'temperature-to-humidity';
const HUMIDITY_TO_LOCATION = 'humidity-to-location';

function Navigator(lines) {
  this.currentMap = null;
  this.maps = {
    [SEED_TO_SOIL]: [],
    [SOIL_TO_FERTILIZER]: [],
    [FERTILIZER_TO_WATER]: [],
    [WATER_TO_LIGHT]: [],
    [LIGHT_TO_TEMPERATURE]: [],
    [TEMPERATURE_TO_HUMIDITY]: [],
    [HUMIDITY_TO_LOCATION]: [],
  };

  this.addMapRanges = function (map, [dest, source, range]) {
    this.maps[map].push({ dest, source, range });
  };

  this.get = function (mapName, value) {
    for (let i = 0; i < this.maps[mapName].length; i++) {
      const { dest, source, range } = this.maps[mapName][i];
      if (value >= source && value <= source + range) {
        return value - source + dest;
      }
    }

    return value;
  };

  this.getSeedData = function (seed) {
    const soil = this.get(SEED_TO_SOIL, seed);
    const fertilizer = this.get(SOIL_TO_FERTILIZER, soil);
    const water = this.get(FERTILIZER_TO_WATER, fertilizer);
    const light = this.get(WATER_TO_LIGHT, water);
    const temperature = this.get(LIGHT_TO_TEMPERATURE, light);
    const humidity = this.get(TEMPERATURE_TO_HUMIDITY, temperature);
    const location = this.get(HUMIDITY_TO_LOCATION, humidity);
    return { soil, fertilizer, water, light, temperature, humidity, location };
  };

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith(SEED_TO_SOIL)) {
      this.currentMap = SEED_TO_SOIL;
    } else if (line.startsWith(SOIL_TO_FERTILIZER)) {
      this.currentMap = SOIL_TO_FERTILIZER;
    } else if (line.startsWith(FERTILIZER_TO_WATER)) {
      this.currentMap = FERTILIZER_TO_WATER;
    } else if (line.startsWith(WATER_TO_LIGHT)) {
      this.currentMap = WATER_TO_LIGHT;
    } else if (line.startsWith(LIGHT_TO_TEMPERATURE)) {
      this.currentMap = LIGHT_TO_TEMPERATURE;
    } else if (line.startsWith(TEMPERATURE_TO_HUMIDITY)) {
      this.currentMap = TEMPERATURE_TO_HUMIDITY;
    } else if (line.startsWith(HUMIDITY_TO_LOCATION)) {
      this.currentMap = HUMIDITY_TO_LOCATION;
    } else if (line !== '') {
      const values = line.split(' ').map((i) => parseInt(i));
      this.addMapRanges(this.currentMap, values);
    }
  }
}

const lines = await getLines(5);

function solvePart1() {
  const seeds = lines[0].split(':')[1].trim().split(' ');
  const navigator = new Navigator(lines);
  return seeds.reduce((acc, seed) => {
    const { location } = navigator.getSeedData(seed);
    return Math.min(acc, location);
  }, Number.POSITIVE_INFINITY);
}

// at least I learned some stuff about threads 😮💨 (TODO research function composition)
function solvePart2() {
  const seedRanges = lines[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((i) => parseInt(i));

  let min = Number.POSITIVE_INFINITY;
  let workers = [];

  for (let i = 0; i < seedRanges.length; i += 2) {
    const start = seedRanges[i];
    const range = seedRanges[i + 1];

    const worker = new Worker(new URL(import.meta.url).pathname, {
      name: (i / 2 + 1).toString(),
      workerData: { start, range },
    });

    workers.push(worker);

    worker.on('message', ({ location }) => {
      min = Math.min(min, location);
      console.log(`Worker finished with min: ${location}. Min: ${min}`);
    });
  }
}

if (isMainThread) {
  solvePart2();
} else {
  const p = performance.now();

  const { start, range } = workerData;
  const navigator = new Navigator(lines);

  let min = Number.POSITIVE_INFINITY;
  for (let j = 0; j < range; j++) {
    const { location } = navigator.getSeedData(start + j);
    min = Math.min(min, location);
  }

  console.log(`Worker finished in ${performance.now() - p}ms with min: ${min}`);

  // Send the result back to the main thread
  parentPort.postMessage({ location: min });
}
