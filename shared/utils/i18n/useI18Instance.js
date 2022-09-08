import { useState } from 'react';

import getUserLocale from '$shared/utils/getUserLocale';
import createI18Instance from '$shared/utils/i18n/createI18Instance';

function useI18nInstance(i18Params) {
  const locale = getUserLocale();
  const [i18nInstance] = useState(() => {
    const { instance } = createI18Instance(
      i18Params,
      locale
    );
    return instance;
  });

  return i18nInstance;
}

export default useI18nInstance;
