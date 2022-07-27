const TRANSLATESPEED = 4;

class MovingCanvas {
  constructor(x, y, item, parentElement) {
    this.element = document.createElement("canvas");
    this.element.width = WIDTH;
    this.element.height = HEIGHT;

    const newContainer = document.createElement("div");
    newContainer.className = "insert-item";
    newContainer.append((document.createElement("h5").textContent = item.name));
    newContainer.appendChild(this.element);
    parentElement.appendChild(newContainer);

    this.context = this.element.getContext("2d");

    this.cellXDim = WIDTH / x;
    this.cellYDim = HEIGHT / y;

    this.xCells = x;
    this.yCells = y;

    /***************************** */

    this.numberOfSteps = item.steps;
    this.translationDirection = item.translate;
    this.countSteps = 0;

    this.extraXCells = this.xCells * 2;
    this.extraYCells = this.yCells * 2;

    this.xCells += this.extraXCells;
    this.yCells += this.extraYCells;

    this.minX = -(this.extraXCells / 2) * this.cellXDim;
    this.minY = -(this.extraYCells / 2) * this.cellYDim;
    this.maxX = (this.extraXCells / 2) * this.cellXDim + WIDTH;
    this.maxY = (this.extraYCells / 2) * this.cellYDim + HEIGHT;

    /***************************** */

    this.initialCells = item;
    this.currentCells = [];
    this.newCells = [];

    this.init(item);
  }

  init(item) {
    for (let x = 0; x < this.xCells; x++) {
      for (let y = 0; y < this.yCells; y++) {
        let status =
          x < this.extraXCells / 2 && y < this.extraYCells / 2
            ? item.data[x][y]
            : false;
        this.currentCells[x] = [
          ...(this.currentCells[x] ? this.currentCells[x] : []),
          new Cell(x * this.cellXDim, y * this.cellYDim, status),
        ];
        this.newCells[x] = [
          ...(this.newCells[x] ? this.newCells[x] : []),
          status,
        ];
      }
    }
    this.draw();
  }

  draw() {
    this.context.clearRect(this.minX, this.minY, this.maxX, this.maxY);

    this.currentCells.forEach((row) => {
      row.forEach((cell) => {
        this.context.fillStyle = cell.aliveStatus ? "black" : "white";
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
    this.context.strokeStyle = "#888";
    this.context.stroke();
  }

  update() {
    run_generation(this.currentCells, this.newCells, this.xCells, this.yCells);

    if (this.countSteps === this.numberOfSteps * 2 - 1) {
      this.context.translate(
        this.translationDirection[0] *
          -TRANSLATESPEED *
          (this.numberOfSteps * 2 - 1),
        this.translationDirection[1] *
          -TRANSLATESPEED *
          (this.numberOfSteps * 2 - 1)
      );
      this.currentCells = [];
      this.newCells = [];
      this.init(this.initialCells);
      this.countSteps = 0;
    } else {
      this.context.translate(
        this.translationDirection[0] * TRANSLATESPEED,
        this.translationDirection[1] * TRANSLATESPEED
      );

      for (let x = 0; x < this.xCells; x++) {
        for (let y = 0; y < this.yCells; y++) {
          this.currentCells[x][y].x += this.translationDirection[0];
          this.currentCells[x][y].y += this.translationDirection[1];
        }
      }

      this.countSteps++;
    }
    this.draw();
  }
}
