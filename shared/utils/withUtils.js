import { QueryClient } from 'react-query';

import createFetcher from '$shared/utils/createFetcher';
import { isClient, isServer } from '$shared/utils/stage';
import hydrateFetchData from '$shared/utils/hydrateFetchData';
import getUserLocale from '$shared/utils/getUserLocale';

const defaultOptions = {
  clientSide: false,
  fetchData: null,
};

function withUtils(handler, options = defaultOptions) {
  if (isClient && options.fetchData) {
    function wrapperClient(ctx) {
      let jsonFetchData = options.fetchData;
      if (typeof options.fetchData === 'function') {
        jsonFetchData = options.fetchData(ctx);
      }

      return {
        fetchData: jsonFetchData,
      };
    }
    
    return wrapperClient;
  }

  if (isClient && !options.clientSide) return undefined;

  async function wrapperGetInitialProps(ctx) {
    const fetcher = createFetcher();
    const req = ctx.req ? ctx.req : ctx.ctx.req;

    Object.defineProperty(ctx, 'queryClient', {
      value: new QueryClient(),
      writable: false,
      configurable: false,
    });

    if (isServer) {
      fetcher.update((config) => {
        config.headers.cookie = req.headers.cookie || '';
        return config;
      });
    }

    Object.defineProperty(ctx, 'fetcher', {
      value: fetcher,
      writable: false,
      configurable: false,
    });
    
    const locale = getUserLocale(req);
    Object.defineProperty(ctx, 'locale', {
      value: locale,
      writable: false,
      configurable: false,
    });

    if (options.fetchData) {
      let jsonFetchData = options.fetchData;
      if (typeof options.fetchData === 'function') {
        jsonFetchData = options.fetchData(ctx);
      }

      const fetchData = hydrateFetchData(jsonFetchData, fetcher);
      
      Object.defineProperty(ctx, 'fetchData', {
        value: fetchData,
        writable: false,
        configurable: false,
      });
    }

    return handler(ctx);
  }

  return wrapperGetInitialProps;
}

export default withUtils;
