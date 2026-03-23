const readline = require("readline");

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function showMenu() {
  console.clear();
  console.log("⚡ VELOCITY CORE\n");

  const lapsInput = await ask("Nombre de tours (1-5) : ");
  const speedInput = await ask("Vitesse (slow / normal / fast) : ");
  const seedInput = await ask("Seed (optionnel) : ");

  const laps = Math.min(Math.max(Number(lapsInput) || 1, 1), 5);

  const normalizedSpeed = speedInput.toLowerCase();
  const speed = ["slow", "normal", "fast"].includes(normalizedSpeed)
    ? normalizedSpeed
    : "normal";

  const seed = seedInput === "" ? null : Number(seedInput);

  return {
    laps,
    speed,
    seed: Number.isNaN(seed) ? null : seed,
  };
}

module.exports = { showMenu };