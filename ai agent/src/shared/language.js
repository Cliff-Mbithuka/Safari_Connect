function normalizeLanguage(language, defaultLanguage, supportedLanguages) {
  const value = (language || "").toLowerCase();
  if (supportedLanguages.includes(value)) {
    return value;
  }
  return defaultLanguage;
}

module.exports = {
  normalizeLanguage
};
