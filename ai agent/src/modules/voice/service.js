const { generateWithGemini } = require("../../shared/gemini");

async function handleVoiceRequest({ language, transcript, provider }) {
  const voiceByLanguage = {
    en: "en-KE-Neural2-A",
    sw: "sw-KE-Standard-A"
  };

  const fallbackReply =
    language === "sw"
      ? "Nimekupata. Nisaidie route, tarehe, na bajeti ili nikupatie chaguo bora."
      : "Got you. Share route, date, and budget so I can suggest the best option.";

  const prompt = [
    "You are a bilingual transport booking voice assistant for Safari Connect.",
    `Language: ${language}.`,
    "Reply in one concise sentence suitable for TTS playback.",
    `User transcript: ${transcript || ""}`
  ].join("\n");

  const generation = await generateWithGemini({ prompt });

  return {
    language,
    provider,
    transcript,
    replyText: generation.text || fallbackReply,
    source: generation.source,
    modelUsed: generation.modelUsed,
    inputMode: "voice",
    outputMode: "text-and-tts",
    ttsVoice: voiceByLanguage[language] || voiceByLanguage.en,
    note: "Wire STT/TTS provider SDK in production; this endpoint keeps a stable contract for frontend/mobile teams."
  };
}

module.exports = {
  handleVoiceRequest
};
