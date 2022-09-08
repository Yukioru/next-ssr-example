import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import i18nConfig from '$shared/utils/i18n/i18nConfig';
import { isClient } from '$shared/utils/stage';
import getI18nBackendConfig from '$shared/utils/i18n/getI18nBackendConfig';
import applyI18Backend from '$shared/utils/i18n/applyI18Backend';

function createI18Instance(params, locale) {
  const config = {
    ...i18nConfig,
    ...getI18nBackendConfig(),
    ...params,
  };

  if (isClient) config.lng = locale;

  const instance = createInstance(config);

  instance.use(initReactI18next);
  applyI18Backend(instance);

  const init = instance.init(config);

  return {
    instance,
    init,
  };
}

export default createI18Instance;
