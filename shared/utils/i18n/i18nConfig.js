import { isClient, isDev } from '$shared/utils/stage';

const i18nConfig = {
  supportedLngs: ['ru', 'en'],
  load: 'currentOnly',
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: false,
  debug: isDev && isClient,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

export default i18nConfig;
