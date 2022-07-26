class Cell {
  constructor(x, y, aliveStatus) {
    this.x = x;
    this.y = y;
    this.aliveStatus = aliveStatus;
  }
}

/* VARIABLES */

let gameCanvas = document.querySelector(".grid");
let context = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth * 0.6;
gameCanvas.height = "800";

let cells = [];
let newCells = [];

let startPos;

let run = false;
let playSpeed = 100;

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

/********************************************************* */

const initiate_cells = (m) => {
  let step = 25;
  let left = 0.5 - Math.ceil(gameCanvas.width / step) * step;
  let top = 0.5 - Math.ceil(gameCanvas.height / step) * step;
  let right = 2 * gameCanvas.width;
  let bottom = 2 * gameCanvas.height;

  let i = 0;

  for (let x = left; x < right; x += step) {
    for (let y = top; y < bottom; y += step) {
      let cell = new Cell(x, y, false);
      cells[i] = [...(cells[i] ? cells[i] : []), cell];
      newCells[i] = [...(newCells[i] ? newCells[i] : []), false];
    }
  }
  draw_game_board();
};

const draw_game_board = () => {
  let step = 25;
  let left = 0.5 - Math.ceil(gameCanvas.width / step) * step;
  let top = 0.5 - Math.ceil(gameCanvas.height / step) * step;
  let right = 2 * gameCanvas.width;
  let bottom = 2 * gameCanvas.height;
  context.clearRect(left, top, right - left, bottom - top);

  // Draw cells
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      context.fillStyle = cells[i][j].aliveStatus ? "red" : "black";
      context.fillRect(cells[i][j].x, cells[i][j].y, step, step);
    }
  }

  context.beginPath();
  for (let x = left; x < right; x += step) {
    context.moveTo(x, top);
    context.lineTo(x, bottom);
  }
  for (let y = top; y < bottom; y += step) {
    context.moveTo(left, y);
    context.lineTo(right, y);
  }
  context.strokeStyle = "#888";
  context.stroke();
};

const get_pos = (e) => ({
  x: e.clientX - gameCanvas.offsetLeft,
  y: e.clientY - gameCanvas.offsetTop,
});

const reset_board = () => {
  startPos = null;
  //   context.setTransform(1, 0, 0, 1, 0, 0); // reset_board translation
  draw_game_board();
};

gameCanvas.addEventListener("mousedown", (e) => {
  reset_board();
  startPos = get_pos(e);
});

gameCanvas.addEventListener("mouseup", reset_board);
// gameCanvas.addEventListener("mouseleave", reset_board);

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

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        cells[i][j].x = cells[i][j].x + pos.x - startPos.x;
        cells[i][j].y = cells[i][j].y + pos.y - startPos.y;
      }
    }

    draw_game_board();
    startPos = pos;
  }
});

initiate_cells();
