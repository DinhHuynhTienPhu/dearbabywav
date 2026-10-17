import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';
import ko from './locales/ko/translation.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ko: { translation: ko },
};

// Keep <html lang> in sync. Registered before init so the first detected language is caught too
// (used by :lang(ko) CSS and SEO)
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lng);
  }
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi', 'ko'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
