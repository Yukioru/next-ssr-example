async function ensureFilesLoad() {
  const { join } = await import('path');

  join(process.cwd(), './public/locales');
}

export default ensureFilesLoad;
