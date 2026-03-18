module.exports = {
  version: "v1",
  endpoints: [
    {
      path: "/v1/recommendation/score",
      method: "POST",
      input: ["trips[]", "intent.maxBudget", "intent.maxTravelMinutes"],
      output: ["topPick", "ranked[]", "rationale"]
    },
    {
      path: "/v1/pricing/forecast",
      method: "POST",
      input: ["route", "departureTime", "currentPrice"],
      output: ["predictedPrice", "demandLevel", "cheaperWindowSuggestion"]
    },
    {
      path: "/v1/prediction/delay-risk",
      method: "POST",
      input: ["weatherRisk", "trafficRisk", "routeRisk"],
      output: ["riskScore", "riskLevel", "recommendation"]
    },
    {
      path: "/v1/fraud/score",
      method: "POST",
      input: ["attemptsLast24h", "cardMismatch", "rapidRetries", "geoMismatch"],
      output: ["fraudScore", "decision", "reason"]
    },
    {
      path: "/v1/chat/respond",
      method: "POST",
      input: ["text", "language"],
      output: ["intent", "message", "source", "modelUsed"]
    },
    {
      path: "/v1/voice/respond",
      method: "POST",
      input: ["transcript", "language"],
      output: ["replyText", "ttsVoice", "source", "modelUsed", "inputMode", "outputMode", "note"]
    }
  ],
  supportedLanguages: ["en", "sw"]
};
