import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend"; // Load translations from public/locales
import LanguageDetector from "i18next-browser-languagedetector"; // Detect browser language

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar", // Set Arabic as the default language
    debug: false,
    supportedLngs: ["en", "ar"], // Only English and Arabic
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Ensure translation files are in public/locales
    },
  });

export default i18n;
