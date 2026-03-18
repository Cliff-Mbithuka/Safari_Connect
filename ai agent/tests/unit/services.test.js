const test = require("node:test");
const assert = require("node:assert/strict");

const { recommendTrips } = require("../../src/modules/recommendation/service");
const { scoreFraud } = require("../../src/modules/fraud/service");
const { respondToPrompt } = require("../../src/modules/chat/service");
const { handleVoiceRequest } = require("../../src/modules/voice/service");

test("recommendation returns top pick", () => {
  const result = recommendTrips({
    trips: [
      { id: "A", price: 1400, travelMinutes: 420, reliabilityScore: 0.8 },
      { id: "B", price: 1100, travelMinutes: 460, reliabilityScore: 0.7 }
    ],
    intent: { maxBudget: 1500, maxTravelMinutes: 500 }
  });

  assert.ok(result.topPick);
  assert.equal(result.ranked.length, 2);
});

test("fraud scoring returns decision", () => {
  const result = scoreFraud({ attemptsLast24h: 5, cardMismatch: true, rapidRetries: 3, geoMismatch: false });

  assert.ok(["allow", "review", "block"].includes(result.decision));
  assert.ok(result.fraudScore >= 0);
  assert.ok(result.fraudScore <= 1);
});

test("chat returns structured response", async () => {
  const result = await respondToPrompt({ text: "I need a cheap bus to Kisii", language: "en" });

  assert.ok(result.intent);
  assert.ok(result.message);
  assert.ok(["gemini", "fallback"].includes(result.source));
});

test("voice returns bilingual TTS metadata", async () => {
  const result = await handleVoiceRequest({
    language: "sw",
    transcript: "Nataka kwenda Kisii kesho asubuhi",
    provider: "gemini"
  });

  assert.equal(result.language, "sw");
  assert.ok(result.replyText);
  assert.ok(result.ttsVoice);
});
