const { randomInt, randomChance } = require("../utils/random");

function getStep() {
  const base = randomInt(1, 2);
  const boost = randomChance(0.1) ? 1 : 0;
  return base + boost;
}

module.exports = { getStep };