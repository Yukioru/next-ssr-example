import dynamic from 'next/dynamic';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import hoistNonReactStatics from 'hoist-non-react-statics';
import { isDev } from '$shared/utils/stage';

let ReactQueryDevtools = () => '';
if (isDev) {
  ReactQueryDevtools = dynamic(() => import('react-query/devtools').then(o => o.ReactQueryDevtools), {
    ssr: false,
  });
}

const withQuery = (WrappedComponent) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 300000,
        staleTime: 300000,
        refetchOnWindowFocus: false,
      },
    },
  });

  const WithReactQuery = (props) => {
    return (
      <QueryClientProvider client={queryClient} contextSharing>
        <Hydrate state={props.pageProps?.dehydratedState}>
          <WrappedComponent {...props} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    );
  };

  return hoistNonReactStatics(WithReactQuery, WrappedComponent);
};

export default withQuery;
