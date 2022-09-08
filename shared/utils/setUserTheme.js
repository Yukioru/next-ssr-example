import Cookie from 'js-cookie';
import { isServer } from '$shared/utils/stage';
import isAbsoluteURL from '$shared/utils/isAbsoluteURL';

const themeCookieName = process.env.NEXT_PUBLIC_THEME_COOKIE;

function setUserTheme(theme) {
  if (isServer) return;
  if (theme) {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    Cookie.set(themeCookieName, theme, {
      path: '/',
      sameSite: 'lax',
      secure: isAbsoluteURL(location.href, { https: true }),
      expires: new Date('2033-12-30'),
    });
  }

  return theme;
}

export default setUserTheme;
