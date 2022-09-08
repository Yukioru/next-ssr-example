import fetcher from '$shared/utils/fetcher';

function hydrateFetchData(jsonData, _fetcher = fetcher) {
  if (!jsonData || typeof jsonData !== 'object') return undefined;
  if (!_fetcher) return jsonData;
  const fetchData = {};
  Object.keys(jsonData).forEach((key) => {
    const fetchParams = jsonData[key];
    fetchData[key] = [fetchParams[0], () => _fetcher(fetchParams[1])];
  });
  return fetchData;
}

export default hydrateFetchData;