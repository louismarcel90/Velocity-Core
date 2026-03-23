const { buildScoreboard } = require("./scoreboard");

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  blink: "\x1b[5m",

  white: "\x1b[37m",
  gray: "\x1b[90m",

  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",

  brightWhite: "\x1b[97m",
};

const BRAND_COLORS = {
  MERCEDES: ANSI.cyan,
  FERRARI: ANSI.red,
  MCLAREN: ANSI.yellow,
  "ASTON MARTIN": ANSI.green,
  AUDI: ANSI.magenta,
};

const CAR_LABELS = {
  MERCEDES: "MERC",
  FERRARI: "FERR",
  MCLAREN: "MCLA",
  "ASTON MARTIN": "ASTN",
  AUDI: "AUDI",
};

let wheelFrame = 0;
let blinkFrame = 0;

function clearScreen() {
  process.stdout.write("\x1b[?25l");
  process.stdout.write("\x1b[H");
  process.stdout.write("\x1b[2J");
  process.stdout.write("\x1b[3J");
}

function hideCursor() {
  process.stdout.write("\x1b[?25l");
}

function showCursor() {
  process.stdout.write("\x1b[?25h");
}

function colorize(text, color) {
  return `${color}${text}${ANSI.reset}`;
}

function bold(text) {
  return `${ANSI.bold}${text}${ANSI.reset}`;
}

function blink(text) {
  return `${ANSI.blink}${text}${ANSI.reset}`;
}

function padCenter(text, width) {
  const rawLength = text.replace(/\x1b\[[0-9;]*m/g, "").length;
  const left = Math.max(0, Math.floor((width - rawLength) / 2));
  const right = Math.max(0, width - rawLength - left);
  return " ".repeat(left) + text + " ".repeat(right);
}

function getWheelPair(seed = 0) {
  const frames = [
    ["o", "o"],
    ["O", "O"],
    ["o", "O"],
    ["O", "o"],
  ];

  return frames[(wheelFrame + seed) % frames.length];
}

function getSmoke(position, seed = 0) {
  if (position <= 1) return "";

  const patterns = [".", "~", "°", "·"];
  const a = patterns[(wheelFrame + seed) % patterns.length];
  const b = patterns[(wheelFrame + seed + 1) % patterns.length];
  const c = patterns[(wheelFrame + seed + 2) % patterns.length];

  return `${ANSI.gray}${a}${b}${c}${ANSI.reset}`;
}

function getCheckeredFinish(height) {
  const lines = [];

  for (let row = 0; row < height; row++) {
    const symbol = row % 2 === 0 ? "▓" : "░";
    lines.push(colorize(symbol, ANSI.brightWhite));
  }

  return lines;
}

function buildCar(car, seed = 0) {
  const label = CAR_LABELS[car.name] || "CAR";
  const color = BRAND_COLORS[car.name] || ANSI.white;
  const [w1, w2] = getWheelPair(seed);

  const top = colorize(` __/[${label}]\\__ `, color);
  const bottom = colorize(`-${w1}---------${w2}-`, color);

  return { top, bottom };
}

function buildTrack(car, trackLength, seed = 0) {
  const { top, bottom } = buildCar(car, seed);

  const safePosition = Math.min(car.position, trackLength);
  const smoke = getSmoke(safePosition, seed);

  const smokeVisibleLength = smoke
    ? smoke.replace(/\x1b\[[0-9;]*m/g, "").length
    : 0;

  const smokeLeft = Math.max(0, safePosition - smokeVisibleLength);
  const leftPad = ".".repeat(smokeLeft);
  const betweenSmokeAndCar = ".".repeat(
    Math.max(0, safePosition - smokeLeft - smokeVisibleLength)
  );
  const rightPad = ".".repeat(Math.max(0, trackLength - safePosition, 0));

  return {
    top: `${ANSI.gray}${leftPad}${ANSI.reset}${smoke}${ANSI.gray}${betweenSmokeAndCar}${ANSI.reset}${top}${ANSI.gray}${rightPad}${ANSI.reset}`,
    bottom: `${ANSI.gray}${leftPad}${ANSI.reset}${smoke}${ANSI.gray}${betweenSmokeAndCar}${ANSI.reset}${bottom}${ANSI.gray}${rightPad}${ANSI.reset}`,
  };
}

function buildHeader(title) {
  const width = 76;
  const decorated = bold(colorize(title, ANSI.brightWhite));

  return [
    "╔════════════════════════════════════════════════════════════════════════════╗",
    `║${padCenter(decorated, width)}║`,
    "╚════════════════════════════════════════════════════════════════════════════╝",
  ];
}

function buildWinnerHeader(title, isBlinking) {
  const width = 36;
  let content = colorize(title, ANSI.brightWhite);
  content = bold(content);

  if (isBlinking) {
    content = blink(content);
  }

  return [
    "╔════════════════════════════════════╗",
    `║${padCenter(content, width)}║`,
    "╚════════════════════════════════════╝",
  ];
}

function buildRaceLines({ cars, trackLength, currentLap, totalLaps, seed }) {
  const lines = [];
  const header = buildHeader("VELOCITY CORE — ULTIMATE ASCII RACE");
  const finish = getCheckeredFinish(cars.length * 3);

  lines.push(...header);
  lines.push("");

  cars.forEach((car, index) => {
    const color = BRAND_COLORS[car.name] || ANSI.white;
    const name = bold(colorize(car.name.padEnd(14), color));
    const track = buildTrack(car, trackLength, index);

    const finishTop = finish[index * 3] || colorize("▓", ANSI.brightWhite);
    const finishBottom = finish[index * 3 + 1] || colorize("░", ANSI.brightWhite);

    lines.push(`${name} ${track.top} ${finishTop}`);
    lines.push(`${" ".repeat(14)} ${track.bottom} ${finishBottom}`);
    lines.push(`${" ".repeat(14)} ${ANSI.gray}${" ".repeat(trackLength + 14)}${ANSI.reset} ${finish[index * 3 + 2] || colorize("▓", ANSI.brightWhite)}`);
  });

  lines.push("");
  lines.push("────────────────────────────────────────────────────────────────────────────");
  lines.push(buildScoreboard(cars, trackLength, currentLap, totalLaps));
  lines.push("");
  lines.push(`${ANSI.dim}Seed: ${seed ?? "none"}${ANSI.reset}`);

  return lines;
}

function drawRace({ cars, trackLength, currentLap, totalLaps, seed }) {
  clearScreen();
  wheelFrame++;

  const lines = buildRaceLines({
    cars,
    trackLength,
    currentLap,
    totalLaps,
    seed,
  });

  process.stdout.write(lines.join("\n") + "\n");
}

async function drawWinner(winner, cars, trackLength, totalLaps, seed) {
  const totalFrames = 6;

  for (let i = 0; i < totalFrames; i++) {
    clearScreen();
    blinkFrame++;

    const lines = [];
    const header = buildWinnerHeader(
      `WINNER: ${winner.name}`,
      i % 2 === 0
    );
    const finish = getCheckeredFinish(cars.length * 3);

    lines.push(...header);
    lines.push("");

    cars.forEach((car, index) => {
      const color = BRAND_COLORS[car.name] || ANSI.white;
      const name = bold(colorize(car.name.padEnd(14), color));
      const track = buildTrack(car, trackLength, index);

      const finishTop = finish[index * 3] || colorize("▓", ANSI.brightWhite);
      const finishBottom = finish[index * 3 + 1] || colorize("░", ANSI.brightWhite);

      lines.push(`${name} ${track.top} ${finishTop}`);
      lines.push(`${" ".repeat(14)} ${track.bottom} ${finishBottom}`);
      lines.push(`${" ".repeat(14)} ${ANSI.gray}${" ".repeat(trackLength + 14)}${ANSI.reset} ${finish[index * 3 + 2] || colorize("▓", ANSI.brightWhite)}`);
    });

    lines.push("");
    lines.push("────────────────────────────────────────────────────────────────────────────");
    lines.push(buildScoreboard(cars, trackLength, totalLaps, totalLaps));
    lines.push("");
    lines.push(`${ANSI.dim}Seed: ${seed ?? "none"}${ANSI.reset}`);

    process.stdout.write(lines.join("\n") + "\n");

    await new Promise((resolve) => setTimeout(resolve, 260));
  }
}

module.exports = {
  clearScreen,
  hideCursor,
  showCursor,
  drawRace,
  drawWinner,
};