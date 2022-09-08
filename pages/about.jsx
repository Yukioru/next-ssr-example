import Link from 'next/link';

import useLocale from '$shared/utils/useLocale';

export default function About() {
  const { t } = useLocale();
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1662436267863-e31fea0120fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80)',
          width: '100%',
          height: 500,
          backgroundSize: 'cover',
        }}
      />
      <h1>About</h1>
      <h2 style={{ height: '120vh' }}>{t('hello.world')}</h2>
      <Link href="/">
        <a>Go to home</a>
      </Link>
      <br />
      <Link href="/demo">
        <a>Go to demo</a>
      </Link>
    </div>
  );
}

About.contextParams = {
  headerTransparent: true,
};
