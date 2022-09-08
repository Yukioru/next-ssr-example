import Cookie from 'js-cookie';
import { useTranslation } from 'react-i18next';

import isAbsoluteURL from '$shared/utils/isAbsoluteURL';
import { isServer } from '$shared/utils/stage';
import i18nConfig from '$shared/utils/i18n/i18nConfig';

const langCookieName = process.env.NEXT_PUBLIC_LANG_COOKIE;
const langDefault = process.env.NEXT_PUBLIC_LANG_DEFAULT;

function useLocale() {
  const { t: translate, i18n } = useTranslation();

  async function changeLocale(nextLocale) {
    if (isServer) return;
    const lng = nextLocale || langDefault;
    const hasResource = await i18n.hasResourceBundle(lng, i18nConfig.defaultNS);
    if (!hasResource) {
      await i18n.reloadResources([lng], i18nConfig.defaultNS);
    }
    await i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    Cookie.set(langCookieName, lng, {
      path: '/',
      sameSite: 'lax',
      secure: isAbsoluteURL(location.href, { https: true }),
      expires: new Date('2033-12-30'),
    });
  }

  function t(key) {
    if (i18n.exists(key)) return translate(key);
    return key;
  }

  return { t, i18n, test: i18n.exists, locale: i18n.language, changeLocale };
}

export default useLocale;
