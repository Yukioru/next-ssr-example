import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { renderToStyleElements } from '@griffel/react';

import getUserLocale from '$shared/utils/getUserLocale';
import getUserTheme from '@/shared/utils/getUserTheme';

import GriffelRendererProvider from '@/utils/GriffelRendererProvider';
import { createGriffelDOMRenderer } from '@/utils/createGriffelDOMRenderer';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const renderer = createGriffelDOMRenderer();

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => {
          return function EnhancedApp(props) {
            return (
              <GriffelRendererProvider renderer={renderer}>
                <App {...props} renderer={renderer} />
              </GriffelRendererProvider>
            );
          };
        },
      });

    const documentProps = await NextDocument.getInitialProps(ctx);
    documentProps.locale = getUserLocale(ctx.req);
    documentProps.theme = getUserTheme(ctx.req);
    documentProps.styles = [
      ...documentProps.styles,
      renderToStyleElements(renderer),
    ];
    return documentProps;
  }

  render() {
    const { locale, theme } = this.props;
    return (
      <Html
        lang={locale}
        dir="ltr"
        prefix="og:https://ogp.me/ns#"
        className={theme}
      >
        <Head>
          <link rel="preload" href="/fonts/inter-cyrillic-variable-wghtOnly-normal.woff2" as="font" type="font/woff2" crossOrigin="true" />
          <link rel="preload" href="/fonts/inter-latin-variable-wghtOnly-normal.woff2" as="font" type="font/woff2" crossOrigin="true" />
          <link rel="preload" href="/fonts/murecho-japanese-400-normal.woff2" as="font" type="font/woff2" crossOrigin="true" />
          <link rel="preload" href="/fonts/murecho-japanese-500-normal.woff2" as="font" type="font/woff2" crossOrigin="true" />
          <link rel="preload" href="/fonts/murecho-japanese-800-normal.woff2" as="font" type="font/woff2" crossOrigin="true" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
