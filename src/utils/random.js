let seed = Date.now();

function setSeed(value) {
  seed = Number(value);
}

function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function randomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomChance(probability) {
  return random() < probability;
}

module.exports = {
  setSeed,
  random,
  randomInt,
  randomChance,
};