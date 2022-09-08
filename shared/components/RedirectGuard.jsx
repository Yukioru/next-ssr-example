import { Fragment } from 'react';
import { useRouter } from 'next/router';

import getRedirectRule from '$shared/utils/getRedirectRule';
import { isClient } from '$shared/utils/stage';
import useGlobalContext from '$shared/utils/useGlobalContext';

function getRedirectComponent(componentKey, schema) {
  return schema[componentKey] ?? (schema.default || <Fragment />);
}

function RedirectGuard({
  children,
  initialContext,
  redirectRule,
  componentRules,
  componentRedirectRule,
  authenticate,
  redirectAuthenticatedTo,
}) {
  const ctx = useGlobalContext();
  const router = useRouter();
  const defaultContext = {
    ...ctx,
    pathname: router.pathname,
    query: router.query,
    asPath: router.asPath,
  };

  let content = children;
  function redirect(rule) {
    if (rule) {
      if (rule.component) {
        content = getRedirectComponent(rule.component, componentRules);
      } else if (rule.url) {
        content = getRedirectComponent(null, componentRules);
        if (isClient) router.replace(rule.url);
      }
    }
  }

  const localRedirectRule = getRedirectRule(
    {
      componentRedirectRule,
      authenticate,
      redirectAuthenticatedTo,
    },
    initialContext || defaultContext
  );

  redirect(redirectRule || localRedirectRule);

  return content;
}

export default RedirectGuard;
