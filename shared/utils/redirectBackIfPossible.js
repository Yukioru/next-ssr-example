import Router from 'next/router';
import qs from 'query-string';

import { isServer } from '$shared/utils/stage';
import isAbsoluteURL from '$shared/utils/isAbsoluteURL';

function redirectBackIfPossible(defaultUrl) {
  if (isServer) return;

  const { search } = location;
  const query = qs.parse(search);

  function redirect(url) {
    if (isAbsoluteURL(url)) {
      location.href = url;
    } else {
      Router.replace(url);
    }
  }

  if (query.redirect) {
    redirect(query.redirect);
  } else {
    redirect(defaultUrl);
  }
}

export default redirectBackIfPossible;
