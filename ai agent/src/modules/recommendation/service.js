function scoreTrip(trip, intent) {
  const maxBudget = Number(intent.maxBudget || Number.MAX_SAFE_INTEGER);
  const preferredMinutes = Number(intent.maxTravelMinutes || 24 * 60);

  const priceScore = Math.max(0, 1 - Number(trip.price) / maxBudget);
  const timeScore = Math.max(0, 1 - Number(trip.travelMinutes) / preferredMinutes);
  const reliabilityScore = Number(trip.reliabilityScore || 0.7);

  const weighted = priceScore * 0.4 + timeScore * 0.35 + reliabilityScore * 0.25;
  return Number(weighted.toFixed(4));
}

function recommendTrips({ trips = [], intent = {} }) {
  const ranked = trips
    .map((trip) => ({
      ...trip,
      score: scoreTrip(trip, intent)
    }))
    .sort((a, b) => b.score - a.score);

  return {
    topPick: ranked[0] || null,
    ranked,
    rationale: "Ranked by weighted price, duration, and route reliability."
  };
}

module.exports = {
  recommendTrips
};
