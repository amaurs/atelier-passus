import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const options = {

  lng: "es",

  fallbackLng: 'fr',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  },

  backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }

};


export default () => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .init(options);
  return i18n;
};
