import Head from 'next/head';

import useLocale from '$shared/utils/useLocale';
import useGlobalContext from '$shared/utils/useGlobalContext';

const defaults = {
  title: 'meta.title',
  description: 'meta.description',
  // image: '/meta/icon-512x512.png',
  // twitter: '',
  schemaType: 'WebSite',
  openGraphType: 'website',
};

function socialTags({
  openGraphType = defaults.openGraphType,
  url,
  title,
  siteTitle,
  description,
  image,
  createdAt,
  updatedAt,
}) {
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content: defaults.twitter,
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content: defaults.twitter,
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: openGraphType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: siteTitle,
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString(),
    },
    {
      name: 'og:modified_time',
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags.filter((o) => !!o.content);
}

function seoTags({ indexing = true }) {
  const metaTags = [
    {
      name: 'robots',
      content: indexing
        ? 'index, follow'
        : 'noimageindex, noindex, nofollow, nosnippet',
    },
  ];

  return metaTags.filter((o) => !!o.content);
}

function Meta({
  title: _title,
  description: _description,
  image: _image,
  schemaType,
  url: _url = '/',
  jdJson = {},
  indexing = true,
  ...props
}) {
  const ctx = useGlobalContext();
  const { t } = useLocale();

  function getI18Property(value, defaults) {
    if (value) return t(value);
    return t(defaults);
  }

  const title = getI18Property(_title, defaults.title);
  const description = getI18Property(_description, defaults.description);
  const image = _image ?? defaults.image;

  let host = ctx.host;
  if (host.includes('localhost')) host = `http://${host}`;
  else host = `https://${host}`;
  const url = `${host}${_url}`;

  const tags = {
    title,
    description,
    image,
    siteTitle: t(defaults.title),
    url,
    indexing,
    ...props,
  };

  return (
    <Head>
      <title>
        {`${title} | ${t('meta.brand')}`}
      </title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {socialTags(tags).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}

      {seoTags(tags).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': schemaType || defaults.schemaType,
            name: title,
            about: description,
            url: url,
            ...jdJson,
          }),
        }}
      />
    </Head>
  );
}

export default Meta;
