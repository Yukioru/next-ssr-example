import createI18Instance from '$shared/utils/i18n/createI18Instance';
import ensureFilesLoad from '$shared/utils/i18n/ensureFileLoad';
import i18nConfig from '$shared/utils/i18n/i18nConfig';

async function loadLocales(locale) {
  await ensureFilesLoad();

  const { instance, init } = createI18Instance({ lng: locale });

  await init;

  const locales = Array.from(
    new Set(
      [
        locale,
        // i18nConfig.fallbackLng,
      ].filter(Boolean)
    )
  );

  const resources = Object.fromEntries(
    locales.map((_locale) => [
      _locale,
      Object.fromEntries(
        i18nConfig.ns.map((namespace) => [
          namespace,
          instance.services.resourceStore.data?.[_locale]?.[namespace] || {},
        ])
      ),
    ])
  );

  return {
    resources,
    lng: locale,
  };
}

export default loadLocales;
