function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFrameDelay(speedMode) {
  if (speedMode === "slow") return 420;
  if (speedMode === "fast") return 220;
  return 320;
}

module.exports = {
  sleep,
  getFrameDelay,
};