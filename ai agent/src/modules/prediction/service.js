function predictDelayRisk({ weatherRisk = 0.3, trafficRisk = 0.4, routeRisk = 0.3 }) {
  const score = weatherRisk * 0.4 + trafficRisk * 0.4 + routeRisk * 0.2;

  let level = "low";
  if (score >= 0.65) {
    level = "high";
  } else if (score >= 0.4) {
    level = "medium";
  }

  return {
    riskScore: Number(score.toFixed(4)),
    riskLevel: level,
    recommendation:
      level === "high"
        ? "Recommend alternate departure time or route."
        : "Trip risk acceptable for current conditions."
  };
}

module.exports = {
  predictDelayRisk
};
