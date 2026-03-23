function getSortedCars(cars) {
  return [...cars].sort((a, b) => {
    if (b.lap !== a.lap) {
      return b.lap - a.lap;
    }
    return b.position - a.position;
  });
}

function buildScoreboard(cars, trackLength, currentLap, totalLaps) {
  const sortedCars = getSortedCars(cars);

  const lines = [];
  lines.push("🏆 LIVE RANKING");
  lines.push(`Lap: ${currentLap}/${totalLaps}`);
  lines.push("");

  sortedCars.forEach((car, index) => {
    const rank = index + 1;
    const distanceLeft = Math.max(0, trackLength - car.position);

    lines.push(
      `${rank}. ${car.name.padEnd(14)} lap=${car.lap}/${totalLaps} | pos=${String(car.position).padStart(2)} | left=${String(distanceLeft).padStart(2)}`
    );
  });

  return lines.join("\n");
}

module.exports = { buildScoreboard };