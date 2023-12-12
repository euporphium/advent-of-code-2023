import getLines from './util/getLines.js';

const lines = await getLines(10);

function PipeMaze(grid) {
  this.grid = grid;
  this.start = findStart(this.grid);

  const directions = {
    NORTH: { row: -1, col: 0, accepts: ['|', 'F', '7', 'S'] },
    EAST: { row: 0, col: 1, accepts: ['-', 'J', '7', 'S'] },
    SOUTH: { row: 1, col: 0, accepts: ['|', 'L', 'J', 'S'] },
    WEST: { row: 0, col: -1, accepts: ['-', 'F', 'L', 'S'] },
  };

  this.travelPipe = function () {
    let visited = new Set();

    function move(row, col) {
      if (visited.has(`${row},${col}`)) {
        return;
      }

      visited.add(`${row},${col}`);

      const connections = [];
      const search = (row, col, dir) => {
        if (dir.accepts.includes(grid[row + dir.row][col + dir.col])) {
          connections.push({ row: row + dir.row, col: col + dir.col });
        }
      };

      let value = grid[row][col];

      if (directions.SOUTH.accepts.includes(value)) {
        search(row, col, directions.NORTH);
      }
      if (directions.NORTH.accepts.includes(value)) {
        search(row, col, directions.SOUTH);
      }
      if (directions.EAST.accepts.includes(value)) {
        search(row, col, directions.WEST);
      }
      if (directions.WEST.accepts.includes(value)) {
        search(row, col, directions.EAST);
      }

      return connections.filter(
        ({ row, col }) => !visited.has(`${row},${col}`),
      )[0];
    }

    let current = move(this.start.row, this.start.col);
    while (current) {
      current = move(current.row, current.col);
    }

    return visited;
  };

  function findStart() {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 'S') {
          return { col, row };
        }
      }
    }
  }
}

function solvePart1() {
  const maze = new PipeMaze(lines);
  return maze.travelPipe().size / 2;
}

function solvePart2() {
  const maze = new PipeMaze(lines);
  const visited = maze.travelPipe();

  let count = 0;
  let inside = false;
  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[r].length; c++) {
      if (visited.has(`${r},${c}`)) {
        if (['S', '|', 'F', '7'].includes(lines[r][c])) {
          inside = !inside;
        }
      } else if (inside) {
        count++;
      }
    }
  }
  return count;
}

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());
