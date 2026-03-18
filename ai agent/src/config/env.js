const dotenv = require("dotenv");

dotenv.config();

const supportedLanguages = (process.env.SUPPORTED_LANGUAGES || "en,sw")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 4100),
  defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
  supportedLanguages,
  voiceProvider: process.env.VOICE_PROVIDER || "gemini",
  hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  geminiApiBaseUrl: process.env.GEMINI_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta"
};
