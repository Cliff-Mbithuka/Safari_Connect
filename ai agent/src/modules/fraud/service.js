function scoreFraud({ attemptsLast24h = 0, cardMismatch = false, rapidRetries = 0, geoMismatch = false }) {
  let score = 0.1;
  score += Math.min(attemptsLast24h * 0.08, 0.4);
  score += cardMismatch ? 0.25 : 0;
  score += Math.min(rapidRetries * 0.07, 0.2);
  score += geoMismatch ? 0.2 : 0;

  const normalized = Math.min(1, Number(score.toFixed(4)));
  const decision = normalized >= 0.7 ? "block" : normalized >= 0.45 ? "review" : "allow";

  return {
    fraudScore: normalized,
    decision,
    reason: "Rule-based baseline score; replace with model score when training data is ready."
  };
}

module.exports = {
  scoreFraud
};
