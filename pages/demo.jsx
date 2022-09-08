import Link from 'next/link';
import { useQuery, dehydrate } from 'react-query';

import withUtils from '$shared/utils/withUtils';
import useLocale from '$shared/utils/useLocale';

function Demo({ fetchData }) {
  const { t } = useLocale();
  const user = useQuery(...fetchData.userQuery);

  if (user.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <Link href="/">
          <a>Go back</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{t('demo.title')}</h1>
      <h3>{t('demo.description')}</h3>

      <Link href="/about">
        <a>Go to about</a>
      </Link>

      <Link href="/">
        <a>Go back</a>
      </Link>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </div>
  );
}

Demo.authenticate = {
  fallback: true,
};

Demo.getInitialProps = withUtils(
  async ({ fetchData, queryClient, isAuth }) => {
    if (isAuth) {
      await queryClient.prefetchQuery(...fetchData.userQuery);
    }

    return {
      dehydratedState: dehydrate(queryClient),
      fetchData,
    };
  },
  {
    fetchData: (ctx) => ({
      userQuery: [['user', ctx.pathname], '/auth/session'],
    }),
  }
);

export default Demo;
