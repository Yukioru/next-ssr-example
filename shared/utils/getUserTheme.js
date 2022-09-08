import cookie from 'cookie';

import { isClient, isServer } from '$shared/utils/stage';

const themeCookieName = process.env.NEXT_PUBLIC_THEME_COOKIE;
const darkReqHeader = [
  'sec-ch-prefers-color-scheme',
  'Sec-CH-Prefers-Color-Scheme',
];

function getUserTheme(req) {
  if (isClient) {
    let theme = 'light';
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      theme = 'dark';
    }
    const themeCookie = cookie.parse(document.cookie || '')[themeCookieName];
    if (themeCookie) theme = themeCookie;
    return theme;
  }

  if (isServer && req) {
    let theme = 'light';
    if (darkReqHeader.some((header) => req.headers[header] === 'dark')) {
      theme = 'dark';
    }
    const themeCookie = cookie.parse(req.headers.cookie || '')[themeCookieName];
    if (themeCookie) theme = themeCookie;
    return theme;
  }
}

export default getUserTheme;
