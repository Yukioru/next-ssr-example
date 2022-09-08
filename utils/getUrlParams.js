function getUrlParams(base, path, outputType) {
  const params = path.split(base)[1].slice(1).split('/');
  if (outputType === 'single') return params[0];
  return params;
}

export default getUrlParams;
