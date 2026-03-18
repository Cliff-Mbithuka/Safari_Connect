function forecastPricing({ route, departureTime, currentPrice }) {
  const hour = new Date(departureTime).getHours();
  const peak = (hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 21);

  const expectedMultiplier = peak ? 1.2 : 0.9;
  const predictedPrice = Number((Number(currentPrice) * expectedMultiplier).toFixed(2));

  return {
    route,
    currentPrice: Number(currentPrice),
    predictedPrice,
    demandLevel: peak ? "high" : "normal",
    cheaperWindowSuggestion: peak ? "10:00-16:00" : "Current slot is already cost-efficient"
  };
}

module.exports = {
  forecastPricing
};
