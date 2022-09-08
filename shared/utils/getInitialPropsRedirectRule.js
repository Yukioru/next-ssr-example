import getRedirectRule from '$shared/utils/getRedirectRule';

function getInitialPropsRedirectRule({ appContext, initialContext, customRedirectRule }) {
  const redirectRule = getRedirectRule(
    {
      componentRedirectRule: customRedirectRule || appContext.Component.redirectRule,
      authenticate: appContext.Component.authenticate,
      redirectAuthenticatedTo: appContext.Component.redirectAuthenticatedTo,
    },
    {
      ...initialContext,
      req: appContext.ctx.req,
    }
  );

  if (redirectRule && redirectRule.url && !redirectRule.component) {
    appContext.ctx.res.writeHead(307, { Location: redirectRule.url });
    appContext.ctx.res.end();
    return { __redirected: true };
  }

  if (
    redirectRule &&
    redirectRule.component === 'notFound' &&
    !redirectRule.url
  ) {
    appContext.ctx.res.statusCode = 404;
  }

  return redirectRule;
}

export default getInitialPropsRedirectRule;
