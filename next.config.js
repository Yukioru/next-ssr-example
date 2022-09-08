const assetPrefix = process.env.ASSETS_PREFIX || '';
const assetRewriteRule = {
  source: `${assetPrefix}/_next/:path*`,
  destination: '/_next/:path*',
};

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  assetPrefix,
  rewrites() {
    const rewriteRules = [
    ];
    if (assetPrefix) rewriteRules.push(assetRewriteRule);
    return rewriteRules;
  },
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin',
          },
          {
            key: 'Accept-CH',
            value: 'Sec-CH-Prefers-Color-Scheme',
          },
        ],
      },
    ];
  },
};
