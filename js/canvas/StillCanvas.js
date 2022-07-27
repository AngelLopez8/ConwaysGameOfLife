const WIDTH = 100;
const HEIGHT = 100;

class StillCanvas {
  constructor(x, y, item, parentElement) {
    // Create new Canvas
    this.element = document.createElement("canvas");
    this.element.width = WIDTH;
    this.element.height = HEIGHT;

    // Create new Div and append Canvas to div and div to parentElement
    const newContainer = document.createElement("div");
    newContainer.append((document.createElement("h5").textContent = item.name));
    newContainer.appendChild(this.element);
    parentElement.appendChild(newContainer);

    this.context = this.element.getContext("2d");

    this.cellXDim = WIDTH / x;
    this.cellYDim = HEIGHT / y;

    this.xCells = x;
    this.yCells = y;

    this.initialCells = [];

    this.init(item);
  }

  init(item) {
    // Populate cells
    for (let x = 0; x < this.xCells; x++) {
      for (let y = 0; y < this.yCells; y++) {
        // console.log(x, y);
        this.initialCells[x] = [
          ...(this.initialCells[x] ? this.initialCells[x] : []),
          new Cell(x * this.cellXDim, y * this.cellYDim, item.data[x][y]),
        ];
      }
    }
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);

    this.initialCells.forEach((row) => {
      row.forEach((cell) => {
        this.context.fillStyle = cell.aliveStatus ? "black" : "white";
        this.context.fillRect(cell.x, cell.y, this.cellXDim, this.cellYDim);
      });
    });

    this.context.beginPath();
    for (let x = 0; x < WIDTH; x += this.cellXDim) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, HEIGHT);
    }
    for (let y = 0; y < HEIGHT; y += this.cellYDim) {
      this.context.moveTo(0, y);
      this.context.lineTo(WIDTH, y);
    }
    this.context.strokeStyle = "#888";
    this.context.stroke();
  }
}
