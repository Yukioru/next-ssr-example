import cookie from 'cookie';

import i18nConfig from '$shared/utils/i18n/i18nConfig';
import { isClient, isServer } from '$shared/utils/stage';

const langCookieName = process.env.NEXT_PUBLIC_LANG_COOKIE;
const langDefault = process.env.NEXT_PUBLIC_LANG_DEFAULT;

function isSupported(lng) {
  return i18nConfig.supportedLngs.includes(lng);
}

function getUserLocale(req) {
  if (isClient) {
    let lng = (navigator.language || navigator.userLanguage).slice(0, 2);
    const lngCookie = cookie.parse(document.cookie || '')[langCookieName];
    if (lngCookie && isSupported(lngCookie)) lng = lngCookie;
    return lng && isSupported(lng) ? lng : langDefault;
  }

  if (isServer && req) {
    let lng = (req.headers['accept-language'] || '').slice(0, 2);
    const lngCookie = cookie.parse(req.headers.cookie || '')[langCookieName];
    if (lngCookie && isSupported(lngCookie)) lng = lngCookie;
    return lng && isSupported(lng) ? lng : langDefault;
  }
}

export default getUserLocale;
