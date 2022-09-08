export const isClient = typeof window !== 'undefined';
export const isServer = !isClient;

export const isProd = process.env.NODE_ENV !== 'development';
export const isDev = !isProd;
