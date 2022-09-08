import FSBackend from 'i18next-fs-backend';

function applyI18Backend(i18n) {
  i18n.use(FSBackend);
  return i18n;
}

export default applyI18Backend;
