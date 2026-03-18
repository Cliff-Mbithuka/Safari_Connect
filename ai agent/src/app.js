const express = require("express");
const contract = require("./contracts/mvp-contract");
const { defaultLanguage, supportedLanguages, voiceProvider } = require("./config/env");
const { normalizeLanguage } = require("./shared/language");
const { recommendTrips } = require("./modules/recommendation/service");
const { forecastPricing } = require("./modules/pricing/service");
const { predictDelayRisk } = require("./modules/prediction/service");
const { scoreFraud } = require("./modules/fraud/service");
const { respondToPrompt } = require("./modules/chat/service");
const { handleVoiceRequest } = require("./modules/voice/service");

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "safari-connect-ai-agent" });
});

app.get("/v1/contract", (_req, res) => {
  res.json(contract);
});

app.post("/v1/recommendation/score", (req, res) => {
  res.json(recommendTrips(req.body || {}));
});

app.post("/v1/pricing/forecast", (req, res) => {
  res.json(forecastPricing(req.body || {}));
});

app.post("/v1/prediction/delay-risk", (req, res) => {
  res.json(predictDelayRisk(req.body || {}));
});

app.post("/v1/fraud/score", (req, res) => {
  res.json(scoreFraud(req.body || {}));
});

app.post("/v1/chat/respond", async (req, res) => {
  try {
    const body = req.body || {};
    const language = normalizeLanguage(body.language, defaultLanguage, supportedLanguages);
    const result = await respondToPrompt({ text: body.text, language });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "chat_response_failed", message: error.message });
  }
});

app.post("/v1/voice/respond", async (req, res) => {
  try {
    const body = req.body || {};
    const language = normalizeLanguage(body.language, defaultLanguage, supportedLanguages);
    const result = await handleVoiceRequest({
      language,
      transcript: body.transcript || "",
      provider: voiceProvider
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "voice_response_failed", message: error.message });
  }
});

module.exports = app;
