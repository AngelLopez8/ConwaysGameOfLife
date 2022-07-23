class Cell {
  constructor(xCoord, yCoord, aliveStatus) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.aliveStatus = aliveStatus;
  }

  get_xCoord() {
    return this.xCoord;
  }

  get_yCoord() {
    return this.yCoord;
  }

  get_alive_status() {
    return this.aliveStatus;
  }

  set_alive_status(status) {
    this.aliveStatus = status;
  }
}

let run = false;
let playSpeed = 100;

let canvas = document.querySelector(".grid");

canvas.width = window.innerWidth * 0.6;
canvas.height = "800"; // window.innerHeight;

let grid = [];
let newGrid = [];
let cellDim = 25;
let xCells = canvas.width / cellDim;
let yCells = canvas.height / cellDim;

for (let i = 0; i < xCells; i++) {
  for (let j = 0; j < yCells; j++) {
    const status =
      Math.floor(Math.random() * (xCells * yCells)) % 2 === 0 ? true : false;
    grid[i] = [
      ...(grid[i] ? grid[i] : []),
      new Cell(i * cellDim, j * cellDim, status),
    ];
    newGrid[i] = [...(newGrid[i] ? newGrid[i] : []), status];
  }
}

const draw = () => {
  if (canvas.getContext) {
    let context = canvas.getContext("2d");
    for (let x = 0; x < xCells; x++) {
      for (let y = 0; y < yCells; y++) {
        context.fillStyle = grid[x][y].get_alive_status() ? "red" : "black";
        context.fillRect(
          grid[x][y].get_xCoord(),
          grid[x][y].get_yCoord(),
          cellDim,
          cellDim
        );
      }
    }
  } else {
    console.log("CONTEXT NOT SUPPORTED");
  }
};

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
          if (grid[x + check[0]][y + check[1]].get_alive_status())
            numOfNeighbors++;
        }
      });

      if (grid[x][y].get_alive_status()) {
        if (numOfNeighbors < 2) newGrid[x][y] = false;
        if (numOfNeighbors > 3) newGrid[x][y] = false;
      } else {
        if (numOfNeighbors === 3) newGrid[x][y] = true;
      }
    }
  }

  for (let x = 0; x < xCells; x++) {
    for (let y = 0; y < yCells; y++) {
      grid[x][y].set_alive_status(newGrid[x][y]);
    }
  }
};

// Set Simulation to run on default speed
let timer;
const play = () => {
  if (run) {
    run_generation();
    draw();
    timer = setTimeout(play, playSpeed);
  } else {
    clearInterval(timer);
  }
};

// Runs generation intervals
document.getElementById("play").addEventListener("click", (event) => {
  if (run !== true) {
    run = true;
    play();
  }
});

// Pauses generation interval
document.getElementById("pause").addEventListener("click", (event) => {
  run = false;
});

// Slows down generation intervals
document.getElementById("slow").addEventListener("click", (event) => {
  playSpeed += 100;
});

// Speeds up generation intervals
document.getElementById("speed").addEventListener("click", (event) => {
  playSpeed -= 100;
});
