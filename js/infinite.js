let canvas2 = document.querySelector(".infinite");
let ctx2 = canvas2.getContext("2d");
canvas2.width = 100;
canvas2.height = 100;

class Temp {
  constructor(x, y, dim) {
    // console.log(x, y);
    this.x = x;
    this.y = y;
    this.dim = dim;
    this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
  }
}

let firstStep = false;
let recs = [];

function draw2() {
  let step = 10;
  let left = 0.5 - Math.ceil(canvas2.width / step) * step;
  let top = 0.5 - Math.ceil(canvas2.height / step) * step;
  let right = 2 * canvas2.width;
  let bottom = 2 * canvas2.height;
  ctx2.clearRect(left, top, right - left, bottom - top);

  if (!firstStep) {
    let i = 0;
    // let j = 0;
    for (let x = left; x < right; x += step) {
      for (let y = top; y < bottom; y += step) {
        let temp = new Temp(x, y, step);
        recs[i] = [...(recs[i] ? recs[i] : []), temp];
      }
    }
    // console.log(recs);
    // console.log(recs[0][900 - 1]);
    // let rect = canvas2.getBoundingClientRect();
    // console.log(rect.left, rect.top, rect.right, rect.bottom);
    // console.log(recs[0].length);
    firstStep = true;
  }

  for (let i = 0; i < recs.length; i++) {
    for (let j = 0; j < recs[i].length; j++) {
      ctx2.fillStyle = recs[i][j].color;
      ctx2.fillRect(recs[i][j].x, recs[i][j].y, recs[i][j].dim, recs[i][j].dim);
    }
  }

  //   ctx2.beginPath();
  //   for (let x = left; x < right; x += step) {
  //     ctx2.moveTo(x, top);
  //     ctx2.lineTo(x, bottom);
  //   }
  //   for (let y = top; y < bottom; y += step) {
  //     ctx2.moveTo(left, y);
  //     ctx2.lineTo(right, y);
  //   }
  //   ctx2.strokeStyle = "#888";
  //   ctx2.stroke();
}

// Mouse event handling:
let start;
const getPos = (e) => ({
  x: e.clientX - canvas2.offsetLeft,
  y: e.clientY - canvas2.offsetTop,
});

const reset = () => {
  start = null;
  //   ctx2.setTransform(1, 0, 0, 1, 0, 0); // reset translation
  draw2();
};

canvas2.addEventListener("mousedown", (e) => {
  reset();
  start = getPos(e);
});

canvas2.addEventListener("mouseup", reset);
// canvas2.addEventListener("mouseleave", reset);

canvas2.addEventListener("mousemove", (e) => {
  let rect = canvas2.getBoundingClientRect();

  // Check if mouse is inside of the canvas2
  if (
    e.x >= rect.left &&
    e.x <= rect.right &&
    e.y >= rect.top &&
    e.y <= rect.bottom
  ) {
    // Only move the grid when we registered a mousedown event
    if (!start) return;
    let pos = getPos(e);
    // Move coordinate system in the same way as the cursor
    ctx2.translate(pos.x - start.x, pos.y - start.y);

    for (let i = 0; i < recs.length; i++) {
      for (let j = 0; j < recs[i].length; j++) {
        recs[i][j].x = recs[i][j].x + pos.x - start.x;
        recs[i][j].y = recs[i][j].y + pos.y - start.y;
      }
    }

    draw2();
    start = pos;
  }
});

// draw2(); // on page load

const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 100);

  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Move coordinate system in the same way as the cursor
  ctx2.translate(-1, 1);

  for (let i = 0; i < recs.length; i++) {
    for (let j = 0; j < recs[i].length; j++) {
      recs[i][j].x = recs[i][j].x + -1;
      recs[i][j].y = recs[i][j].y + 1;
    }
  }

  draw2();
};
animate();
