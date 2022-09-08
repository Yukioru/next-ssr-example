import { isClient, isServer } from '$shared/utils/stage';

function getHost(req) {
  if (isServer && req) {
    return req.headers?.host;
  }
  if (isClient) {
    return location.host;
  }
  return '';
}

export default getHost;
