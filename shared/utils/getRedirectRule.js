import getCurrentURL from '$shared/utils/getCurrentURL';

const defaultAuthRedirect = process.env.NEXT_PUBLIC_DEFAULT_AUTH_REDIRECT;
const redirectPrefix = process.env.NEXT_PUBLIC_REDIRECT_PREFIX;

function getRedirectRule({ componentRedirectRule, authenticate, redirectAuthenticatedTo }, ctx) {
  let redirectRule = {};

  if (componentRedirectRule) {
    if (typeof componentRedirectRule === 'function') {
      redirectRule = componentRedirectRule(ctx);
    } else {
      redirectRule = componentRedirectRule;
    }
  }

  if (authenticate && !ctx.isAuth) {
    const defaultRedirect = defaultAuthRedirect || '/';
    if (typeof authenticate === 'object') {
      if (authenticate.redirectTo) {
        redirectRule.url = authenticate.redirectTo;
      } else {
        redirectRule.url = defaultRedirect;
      }
      if (authenticate.fallback) {
        if (authenticate.fallback === true) {
          redirectRule.url = `${redirectRule.url}${redirectPrefix}${getCurrentURL(ctx.req)}`;
        } else {
          redirectRule.url = `${redirectRule.url}${redirectPrefix}${authenticate.fallback}`;
        }
      }
    } else if (authenticate === 'forbidden') {
      redirectRule.component = 'forbidden';
    } else if (authenticate === true) {
      redirectRule.url = defaultRedirect;
    }
    return redirectRule;
  }

  if (redirectAuthenticatedTo) {
    if (typeof redirectAuthenticatedTo === 'function') {
      redirectRule.url = redirectAuthenticatedTo(ctx);
    } else if (ctx.isAuth) {
      redirectRule.url = redirectAuthenticatedTo;
    }
    return redirectRule;
  }

  return redirectRule;
}

export default getRedirectRule;
