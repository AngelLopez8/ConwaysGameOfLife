gameCanvas.element.addEventListener("mouseup", (event) => {
  let rect = gameCanvas.element.getBoundingClientRect();

  let pos = {
    x: Math.floor(event.x - rect.left),
    y: Math.floor(event.y - rect.top),
  };

  // Check if mouse is inside of the canvas
  if (
    event.x >= rect.left &&
    event.x <= rect.right &&
    event.y >= rect.top &&
    event.y <= rect.bottom
  ) {
    let x =
      Math.floor(pos.x / gameCanvas.cellXDim) + gameCanvas.extraXCells / 2;
    let y =
      Math.floor(pos.y / gameCanvas.cellYDim) + gameCanvas.extraYCells / 2;

    gameCanvas.currentCells[x][y].aliveStatus =
      !gameCanvas.currentCells[x][y].aliveStatus;
    gameCanvas.newCells[x][y] = !gameCanvas.newCells[x][y];
  }
  gameCanvas.draw();
  // reset();
});

/**************************************************************** */
// Mouse event handling:
// let start;

// const getPos = (e) => ({
//   x: e.clientX - gameCanvas.element.offsetLeft,
//   y: e.clientY - gameCanvas.element.offsetTop,
// });

// const reset = () => {
//   start = null;
//   // ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
//   gameCanvas.draw();
// };

// gameCanvas.element.addEventListener("mousedown", (event) => {
//   reset();
//   start = getPos(event);
// });

// gameCanvas.element.addEventListener("mouseleave", reset);

// gameCanvas.element.addEventListener("mousemove", (e) => {
//   // Only move the grid when we registered a mousedown event
//   if (!start) return;
//   let pos = getPos(e);
//   // Move coordinate system in the same way as the cursor
//   gameCanvas.context.translate(pos.x - start.x, pos.y - start.y);

//   gameCanvas.draw();
//   start = pos;
// });

/**************************************************************** */

// Move to the next generation
document.querySelector("#step-forward").addEventListener("click", () => {
  gameCanvas.update();
});

let timer;
let delay = 500;
let run = false;

const play = () => {
  if (run) {
    gameCanvas.update();
    timer = setTimeout(play, delay);
  } else {
    clearInterval(timer);
  }
};

// Start Running Generations
document.querySelector("#play").addEventListener("click", () => {
  if (run !== true) {
    run = true;
    gameCanvas.save();
    play();
  }
});

// Pause running Generations
document.querySelector("#pause").addEventListener("click", () => {
  run = false;
});

// Slow down generations
document.querySelector("#slow").addEventListener("click", (event) => {
  delay += 100;
});

// Speed up generations
document.querySelector("#speed").addEventListener("click", (event) => {
  delay -= 100;
});

// Clear Board
document.querySelector("#clear").addEventListener("click", (event) => {
  gameCanvas.clear();
});

// Reset Board to state before play
document.querySelector("#reset").addEventListener("click", (event) => {
  gameCanvas.reset();
});
