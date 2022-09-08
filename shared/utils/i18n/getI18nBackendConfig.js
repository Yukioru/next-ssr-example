import { isClient, isServer } from '$shared/utils/stage';

const publicPath = './public';
const localesPath = '/locales';
const filePath = '/{{lng}}/{{ns}}.json';

function getI18nBackendConfig() {
  if (isServer) {
    const path = require('path');

    return {
      backend: {
        loadPath: path.join(process.cwd(), publicPath, localesPath, filePath),
      },
    };
  }

  if (isClient) {
    return {
      backend: {
        loadPath: `${localesPath}${filePath}`,
      },
    };
  }

  return {};
};

export default getI18nBackendConfig;
