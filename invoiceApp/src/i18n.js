import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import ENGLISH from "./locales/en/translation.json";
import TURKISH from "./locales/tr/translation.json";


const resources = {
    en: {
        translation: ENGLISH
    },
    tr: {
        translation: TURKISH
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

