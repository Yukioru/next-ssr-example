import '@/styles/fonts.css';

import Error from 'next/error';

import RedirectGuard from '$shared/components/RedirectGuard';
import GlobalContextProvider from '$shared/components/GlobalContextProvider';
import withUtils from '$shared/utils/withUtils';
import hydrateFetchData from '$shared/utils/hydrateFetchData';
import withI18n from '$shared/utils/i18n/withI18n';
import getAppInitialProps from '$shared/utils/getAppInitialProps';

import MainLayout from '@/layouts/MainLayout';
import Forbidden from '@/containers/Forbidden';
import withGriffel from '@/utils/withGriffel';
import withQuery from '@/utils/withQuery';

function App({
  Component,
  pageProps,
  initialContext,
  redirectRule,
}) {
  const Layout = Component.Layout || MainLayout;
  const fetchData = hydrateFetchData(pageProps?.fetchData);
  const runtimeContext = Component.contextParams || {};

  return (
    <GlobalContextProvider
      initialContext={initialContext || {}}
      runtimeContext={runtimeContext}
    >
      <Layout>
        <RedirectGuard
          initialContext={initialContext}
          redirectRule={redirectRule}
          componentRedirectRule={Component.redirectRule}
          authenticate={Component.authenticate}
          redirectAuthenticatedTo={Component.redirectAuthenticatedTo}
          componentRules={{
            forbidden: <Forbidden />,
            notFound: <Error statusCode={404} />,
          }}
        >
          <Component {...pageProps} fetchData={fetchData} />
        </RedirectGuard>
      </Layout>
    </GlobalContextProvider>
  );
}

App.getInitialProps = withUtils(async (appContext) => {
  const appProps = await getAppInitialProps(appContext);
  return appProps;
});

export default withQuery(withGriffel(withI18n(App)));
