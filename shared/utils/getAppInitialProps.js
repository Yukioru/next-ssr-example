import NextApp from 'next/app';

import loadLocales from '$shared/utils/i18n/loadLocales';
import getInitialPropsRedirectRule from '$shared/utils/getInitialPropsRedirectRule';
import getUserTheme from '$shared/utils/getUserTheme';
import getHost from '$shared/utils/getHost';

async function getAppInitialProps(appContext) {
  const user = await appContext.fetcher.get('/auth/session');

  const userPack = {
    user,
    isAuth: Boolean(Object.keys(user || {}).length),
  };

  const initialContext = {
    ...userPack,
    theme: getUserTheme(appContext.ctx.req),
    host: getHost(appContext.ctx.req),
    pathname: appContext.ctx.pathname,
    query: appContext.ctx.query,
    asPath: appContext.ctx.asPath,
  };

  const redirectRule = getInitialPropsRedirectRule({
    appContext,
    initialContext,
  });
  if (redirectRule?.__redirected) return;

  const i18Params = await loadLocales(appContext.locale);
  const outputProps = { initialContext, redirectRule, i18Params };

  if (redirectRule && (redirectRule.component || redirectRule.url)) {
    return outputProps;
  }

  const appProps = await NextApp.getInitialProps({
    ...appContext,
    ctx: {
      ...appContext.ctx,
      ...userPack,
    },
  });

  if (appProps.pageProps.redirectRule) {
    const __redirectRule = getInitialPropsRedirectRule({
      appContext,
      initialContext,
      customRedirectRule: appProps.pageProps.redirectRule,
    });
    if (__redirectRule?.__redirected) return;
    outputProps.redirectRule = __redirectRule;
  }

  return { ...appProps, ...outputProps };
}

export default getAppInitialProps;
