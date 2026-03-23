const { getStep } = require("./physics");
const {
  clearScreen,
  hideCursor,
  showCursor,
  drawRace,
  drawWinner,
} = require("./renderer");
const { sleep, getFrameDelay } = require("../utils/timing");

const TRACK_LENGTH = 120;

function createCars() {
  return [
    { name: "MERCEDES", lap: 1, position: 0 },
    { name: "FERRARI", lap: 1, position: 0 },
    { name: "MCLAREN", lap: 1, position: 0 },
    { name: "ASTON MARTIN", lap: 1, position: 0 },
    { name: "AUDI", lap: 1, position: 0 },
  ];
}

async function countdown() {
  const steps = ["3", "2", "1", "GO"];

  for (const step of steps) {
    clearScreen();
    console.log("\n");
    console.log("                ⚡ VELOCITY CORE");
    console.log("");
    console.log(`                     ${step}`);
    console.log("\n");
    await sleep(step === "GO" ? 700 : 900);
  }
}

function advanceCars(cars, trackLength, totalLaps) {
  let winner = null;

  for (const car of cars) {
    car.position += getStep();

    if (car.position >= trackLength) {
      if (car.lap < totalLaps) {
        car.lap += 1;
        car.position = 0;
      } else if (!winner) {
        winner = car;
      }
    }
  }

  return winner;
}

function getCurrentLap(cars) {
  return Math.max(...cars.map((car) => car.lap));
}

async function runRace(config) {
  const cars = createCars();
  const frameDelay = getFrameDelay(config.speed);

  let winner = null;

  hideCursor();

  try {
    await countdown();

    while (!winner) {
      winner = advanceCars(cars, TRACK_LENGTH, config.laps);

      drawRace({
        cars,
        trackLength: TRACK_LENGTH,
        currentLap: getCurrentLap(cars),
        totalLaps: config.laps,
        seed: config.seed,
      });

      await sleep(frameDelay);
    }

    await drawWinner(winner, cars, TRACK_LENGTH, config.laps, config.seed);
    await sleep(2200);
  } finally {
    showCursor();
  }
}

module.exports = { runRace };