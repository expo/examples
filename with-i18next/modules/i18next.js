import i18next from "i18next";
import en from "../locale/en.json";
import es from "../locale/es.json";
import mr from "../locale/mr.json";
import languages from "../constants/languages.json";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: { translation: en },
  es: { translation: es },
  mr: { translation: mr },
};
export const LanguageList = languages;

i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "mr",
  fallbackLng: "en",
  resources,
});

export default i18next;
