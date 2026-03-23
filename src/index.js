const { showMenu } = require("./cli/menu");
const { setSeed } = require("./utils/random");
const { runRace } = require("./engine/race");

async function main() {
  const config = await showMenu();

  if (config.seed !== null) {
    setSeed(config.seed);
  }

  await runRace(config);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});