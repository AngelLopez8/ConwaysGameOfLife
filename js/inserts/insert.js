let stillsDiv = document.querySelector("#stills");
let oscillatorsDiv = document.querySelector("#oscillators");
let spaceshipsDiv = document.querySelector("#spaceships");

const blockCanvas = new StillCanvas(
  block.data.length,
  block.data[0].length,
  block,
  stillsDiv
);

let temp = [];

blockCanvas.element.addEventListener("mousedown", (event) => {
  temp = blockCanvas.initialCells;
});

const beehiveCanvas = new StillCanvas(
  beehive.data.length,
  beehive.data[0].length,
  beehive,
  stillsDiv
);
const loafCanvas = new StillCanvas(
  loaf.data.length,
  loaf.data[0].length,
  loaf,
  stillsDiv
);
const boatCanvas = new StillCanvas(
  boat.data.length,
  boat.data[0].length,
  boat,
  stillsDiv
);
const tubCanvas = new StillCanvas(
  tub.data.length,
  tub.data[0].length,
  tub,
  stillsDiv
);

/************************************************************* */

const blinkerCanvas = new ActiveCanvas(
  blinker.data.length,
  blinker.data[0].length,
  blinker,
  oscillatorsDiv
);
const toadCanvas = new ActiveCanvas(
  toad.data.length,
  toad.data[0].length,
  toad,
  oscillatorsDiv
);
const beaconCanvas = new ActiveCanvas(
  beacon.data.length,
  beacon.data[0].length,
  beacon,
  oscillatorsDiv
);
const pulsarCanvas = new ActiveCanvas(
  pulsar.data.length,
  pulsar.data[0].length,
  pulsar,
  oscillatorsDiv
);

const pentadecathlonCanvas = new ActiveCanvas(
  pentadecathlon.data.length,
  pentadecathlon.data[0].length,
  pentadecathlon,
  oscillatorsDiv
);

setInterval(() => {
  blinkerCanvas.update();
  toadCanvas.update();
  beaconCanvas.update();
  pulsarCanvas.update();
  pentadecathlonCanvas.update();
}, 500);

/************************************************************* */

const gliderCanvas = new MovingCanvas(
  glider.data.length,
  glider.data[0].length,
  glider,
  spaceshipsDiv
);
const lightWeightSpaceshipCanvas = new MovingCanvas(
  lightWeightSpaceship.data.length,
  lightWeightSpaceship.data[0].length,
  lightWeightSpaceship,
  spaceshipsDiv
);

const middleWeightSpaceShipCanvas = new MovingCanvas(
  middleWeightSpaceShip.data.length,
  middleWeightSpaceShip.data[0].length,
  middleWeightSpaceShip,
  spaceshipsDiv
);

const heavyWeightSpaceShipCanvas = new MovingCanvas(
  heavyWeightSpaceShip.data.length,
  heavyWeightSpaceShip.data[0].length,
  heavyWeightSpaceShip,
  spaceshipsDiv
);

setInterval(() => {
  gliderCanvas.update();
  lightWeightSpaceshipCanvas.update();
  middleWeightSpaceShipCanvas.update();
  heavyWeightSpaceShipCanvas.update();
}, 500);
