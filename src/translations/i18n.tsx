import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Your translation files
import fr from './French.json';
import en from './English.json';
import es from './Spanish.json';

i18n.use(initReactI18next).init({

  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
