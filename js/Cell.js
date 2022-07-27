// Cell Class
class Cell {
  constructor(x, y, aliveStatus) {
    this.x = x;
    this.y = y;
    this.aliveStatus = aliveStatus;
  }
}

const cellChecks = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, 0],
  [1, -1],
  [1, 1],
];

const run_generation = (cells, newCells, xCells, yCells) => {
  for (let x = 0; x < xCells; x++) {
    for (let y = 0; y < yCells; y++) {
      let numOfNeighbors = 0;
      cellChecks.forEach((check) => {
        if (
          x + check[0] >= 0 &&
          x + check[0] < xCells &&
          y + check[1] >= 0 &&
          y + check[1] < yCells
        ) {
          if (cells[x + check[0]][y + check[1]].aliveStatus) numOfNeighbors++;
        }
      });

      if (cells[x][y].aliveStatus) {
        if (numOfNeighbors < 2 || numOfNeighbors > 3) newCells[x][y] = false;
      } else {
        if (numOfNeighbors === 3) newCells[x][y] = true;
      }
    }
  }

  for (let x = 0; x < xCells; x++) {
    for (let y = 0; y < yCells; y++) {
      cells[x][y].aliveStatus = newCells[x][y];
    }
  }
};
