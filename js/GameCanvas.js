let gameCanvas = document.querySelector(".grid");
let context = gameCanvas.getContext("2d");

gameCanvas.width = 800;
gameCanvas.height = 800;

let cells = [];
let newCells = [];
let cellDim = 25;

// Number Of Cells on Screen
let xCells = Math.floor(gameCanvas.width / cellDim);
let yCells = Math.floor(gameCanvas.height / cellDim);

// Add Extra Cells to hide
let extraXCells = xCells * 2;
let extraYCells = yCells * 2;

// Total Number of cells generated
xCells += extraXCells;
yCells += extraYCells;

// Board Boundary limits
const minX = -(extraXCells / 2) * cellDim;
const minY = -(extraYCells / 2) * cellDim;
const maxX = gameCanvas.width + (extraXCells / 2) * cellDim;
const maxY = gameCanvas.height + (extraYCells / 2) * cellDim;

// Cell Class
class Cell {
  constructor(x, y, aliveStatus) {
    this.x = x;
    this.y = y;
    this.aliveStatus = aliveStatus;
  }
}

// Populate Cell array
const initiate_cells = () => {
  let xCoord = minX;
  for (let x = 0; x < xCells; x++) {
    let yCoord = minY;
    for (let y = 0; y < yCells; y++) {
      cells[x] = [
        ...(cells[x] ? cells[x] : []),
        new Cell(xCoord, yCoord, false),
      ];
      newCells[x] = [...(newCells[x] ? newCells[x] : []), false];
      yCoord += cellDim;
    }
    xCoord += cellDim;
  }

  draw_game_board();
};

const draw_game_board = () => {
  context.clearRect(minX, minY, maxX, maxY);
  for (let x = 0; x < xCells; x++) {
    for (let y = 0; y < yCells; y++) {
      context.fillStyle = cells[x][y].aliveStatus ? "red" : "black";
      context.fillRect(cells[x][y].x, cells[x][y].y, cellDim, cellDim);
    }
  }

  context.beginPath();
  for (let x = minX; x < maxX; x += cellDim) {
    context.moveTo(x, minY);
    context.lineTo(x, maxY);
  }
  for (let y = minY; y < maxY; y += cellDim) {
    context.moveTo(minX, y);
    context.lineTo(maxX, y);
  }
  context.strokeStyle = "#888";
  context.stroke();
};

/*********************************************** */

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

const run_generation = () => {
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

document.getElementById("step-forward").addEventListener("click", (event) => {
  run_generation();
  draw_game_board();
});

/*********************************************** */

let startPos;

const get_pos = (e) => ({
  x: e.clientX - gameCanvas.offsetLeft,
  y: e.clientY - gameCanvas.offsetTop,
});

const reset_board = () => {
  startPos = null;
  draw_game_board();
};

gameCanvas.addEventListener("mousedown", (event) => {
  let rect = gameCanvas.getBoundingClientRect();

  let pos = {
    x: event.x - rect.left,
    y: event.y - rect.top,
  };

  // Check if mouse is inside of the canvas
  if (
    event.x >= rect.left &&
    event.x <= rect.right &&
    event.y >= rect.top &&
    event.y <= rect.bottom
  ) {
    mousedown = true;

    let x = Math.floor(pos.x / cellDim) + extraXCells / 2;
    let y = Math.floor(pos.y / cellDim) + extraYCells / 2;

    console.log(x, y);

    cells[x][y].aliveStatus = true;
    newCells[x][y] = true;
  }

  reset_board();
  startPos = get_pos(event);
});

gameCanvas.addEventListener("mouseup", reset_board);

gameCanvas.addEventListener("mousemove", (e) => {
  let rect = gameCanvas.getBoundingClientRect();

  // Check if mouse is inside of the gameCanvas
  if (
    e.x >= rect.left &&
    e.x <= rect.right &&
    e.y >= rect.top &&
    e.y <= rect.bottom
  ) {
    // Only move the grid when we registered a mousedown event
    if (!startPos) return;
    let pos = get_pos(e);
    // Move inate system in the same way as the cursor
    context.translate(pos.x - startPos.x, pos.y - startPos.y);

    for (let x = 0; x < xCells; x++) {
      for (let y = 0; y < yCells; y++) {
        cells[x][y].x = cells[x][y].x + (pos.x - startPos.x);
        cells[x][y].y = cells[x][y].y + (pos.y - startPos.y);
      }
    }

    draw_game_board();
    startPos = pos;
  }
});

/*********************************************** */

initiate_cells();
