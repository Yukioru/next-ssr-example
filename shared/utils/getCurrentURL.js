import { isClient, isServer } from '$shared/utils/stage';

function getCurrentURL(req) {
  let url;

  if (isClient) {
    const { pathname, search } = location;
    url = `${pathname}${search}`;
  }

  if (isServer && req) {
    url = req.url;
  }

  return url;
}

export default getCurrentURL;
