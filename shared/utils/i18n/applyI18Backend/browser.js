import HttpBackend from 'i18next-http-backend';

function applyI18Backend(i18n) {
  i18n.use(HttpBackend);
  return i18n;
}

export default applyI18Backend;
