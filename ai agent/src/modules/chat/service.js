const { generateWithGemini } = require("../../shared/gemini");

const swahiliHints = {
  recommendation: "Nimepata safari bora kulingana na bei, muda, na uaminifu wa route.",
  pricing: "Ninaweza kukushauri muda wa bei nafuu kabla hujahifadhi.",
  delay: "Ninaweza kukupa tahadhari ya ucheleweshaji kwa route uliyochagua.",
  fraud: "Muamala huu una alama zisizo za kawaida na unahitaji ukaguzi."
};

const englishHints = {
  recommendation: "I found the best trip based on price, time, and reliability.",
  pricing: "I can suggest a cheaper departure window before booking.",
  delay: "I can flag delay risk for your selected route.",
  fraud: "This transaction shows unusual behavior and needs review."
};

function inferIntent(text) {
  const lower = (text || "").toLowerCase();

  if (lower.includes("cheap") || lower.includes("bei")) {
    return "pricing";
  }
  if (lower.includes("delay") || lower.includes("uchelewesh")) {
    return "delay";
  }
  if (lower.includes("fraud") || lower.includes("suspicious")) {
    return "fraud";
  }
  return "recommendation";
}

async function respondToPrompt({ text, language = "en" }) {
  const intent = inferIntent(text);
  const hints = language === "sw" ? swahiliHints : englishHints;
  const fallbackMessage = hints[intent] || hints.recommendation;

  if (!text || !String(text).trim()) {
    return {
      intent,
      message: fallbackMessage,
      source: "fallback",
      modelUsed: null
    };
  }

  const prompt = [
    "You are Safari Connect AI agent for transport booking decisions.",
    `Language: ${language}.`,
    `Detected intent: ${intent}.`,
    "Respond in 1-2 concise sentences and provide practical guidance.",
    `User message: ${text}`
  ].join("\n");

  const result = await generateWithGemini({ prompt });

  return {
    intent,
    message: result.text || fallbackMessage,
    source: result.source,
    modelUsed: result.modelUsed
  };
}

module.exports = {
  respondToPrompt
};
