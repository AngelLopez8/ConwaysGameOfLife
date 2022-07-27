let insertDiv = document.querySelector(".inserts");

const block = {
  name: "Block",
  data: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

const beehive = {
  name: "Beehive",
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

const loaf = {
  name: "Loaf",
  data: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
};

const boat = {
  name: "Boat",
  data: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

const tub = {
  name: "Tub",
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

// const blockCanvas = new StillCanvas(4, 4, block, insertDiv);
// const beehiveCanvas = new StillCanvas(6, 5, beehive, insertDiv);
// const loafCanvas = new StillCanvas(6, 6, loaf, insertDiv);
// const boatCanvas = new StillCanvas(5, 5, boat, insertDiv);
// const tubCanvas = new StillCanvas(5, 5, tub, insertDiv);

const blinker = {
  name: "Blinker",
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

const toad = {
  name: "Toad",
  data: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
};

const beacon = {
  name: "Beacon",
  data: [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
  ],
};

const blinkerCanvas = new ActiveCanvas(5, 5, blinker, insertDiv);
const toadCanvas = new ActiveCanvas(6, 6, toad, insertDiv);
const beaconCanvas = new ActiveCanvas(6, 6, beacon, insertDiv);

setInterval(() => {
  blinkerCanvas.update();
  toadCanvas.update();
  beaconCanvas.update();
}, 500);

const glider = {
  name: "Glider",
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
};

const gliderCanvas = new MovingCanvas(5, 5, glider, insertDiv);

setInterval(() => {
  // gliderCanvas.update();
}, 500);
