let GAMEWIDTH = window.innerWidth * 0.6;
let GAMEHEIGHT = window.innerHeight * 0.6;

/***************************** */

let grid = true;
let gridLineColor = "#888";
let aliveCellColor = "black";
let deadCellColor = "white";

/***************************** */

class GameCanvas {
  constructor(x, y, parentElement) {
    //
    this.element = document.createElement("canvas");
    this.element.width = GAMEWIDTH;
    this.element.height = GAMEHEIGHT;
    this.element.className = "game-board";

    //
    parentElement.appendChild(this.element);

    this.context = this.element.getContext("2d");

    this.cellXDim = GAMEWIDTH / x;
    this.cellYDim = GAMEHEIGHT / y;

    this.xCells = x;
    this.yCells = y;

    /***************************** */

    this.extraXCells = this.xCells * 2;
    this.extraYCells = this.yCells * 2;

    this.xCells += this.extraXCells;
    this.yCells += this.extraYCells;

    this.minX = -(this.extraXCells / 2) * this.cellXDim;
    this.minY = -(this.extraYCells / 2) * this.cellYDim;
    this.maxX = (this.extraXCells / 2) * this.cellXDim + GAMEWIDTH;
    this.maxY = (this.extraYCells / 2) * this.cellYDim + GAMEHEIGHT;

    /***************************** */
    this.savedCells = [];
    this.currentCells = [];
    this.newCells = [];

    this.init();
  }

  init() {
    let xCoord = this.minX;
    for (let x = 0; x < this.xCells; x++) {
      let yCoord = this.minY;
      for (let y = 0; y < this.yCells; y++) {
        let status = false;
        this.currentCells[x] = [
          ...(this.currentCells[x] ? this.currentCells[x] : []),
          new Cell(xCoord, yCoord, status),
        ];
        this.newCells[x] = [
          ...(this.newCells[x] ? this.newCells[x] : []),
          status,
        ];
        yCoord += this.cellYDim;
      }
      xCoord += this.cellXDim;
    }

    this.draw();
  }

  draw() {
    this.context.clearRect(this.minX, this.minY, this.maxX, this.maxY);

    this.currentCells.forEach((row) => {
      row.forEach((cell) => {
        this.context.fillStyle = cell.aliveStatus
          ? aliveCellColor
          : deadCellColor;
        this.context.fillRect(cell.x, cell.y, this.cellXDim, this.cellYDim);
      });
    });

    this.context.beginPath();
    for (let x = this.minX; x < this.maxX; x += this.cellXDim) {
      this.context.moveTo(x, this.minY);
      this.context.lineTo(x, this.maxY);
    }
    for (let y = this.minY; y < this.maxY; y += this.cellYDim) {
      this.context.moveTo(this.minX, y);
      this.context.lineTo(this.maxX, y);
    }
    this.context.strokeStyle = gridLineColor;
    this.context.stroke();
  }

  update() {
    run_generation(this.currentCells, this.newCells, this.xCells, this.yCells);
    this.draw();
  }

  save() {
    for (let x = 0; x < this.xCells; x++) {
      for (let y = 0; y < this.yCells; y++) {
        this.savedCells[x] = [
          ...(this.savedCells[x] ? this.savedCells[x] : []),
          this.currentCells[x][y].aliveStatus,
        ];
      }
    }
  }

  clear() {
    this.currentCells = [];
    this.newCells = [];

    this.init();
  }

  reset() {
    this.clear();

    for (let x = 0; x < this.xCells; x++) {
      for (let y = 0; y < this.yCells; y++) {
        this.currentCells[x][y].aliveStatus = this.savedCells[x][y];
        this.newCells[x][y] = this.savedCells[x][y];
      }
    }
    this.draw();
  }
}

let gameDiv = document.querySelector(".game");
const gameCanvas = new GameCanvas(50, 50, gameDiv);

window.addEventListener("resize", (event) => {
  GAMEWIDTH = window.innerWidth * 0.6;
  GAMEHEIGHT = window.innerHeight * 0.6;

  gameCanvas.element.width = GAMEWIDTH;
  gameCanvas.element.height = GAMEHEIGHT;

  gameCanvas.clear();
});
