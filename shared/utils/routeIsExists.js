function routeIsExists({ query, byStatics, byDynamics }) {
  let output = true;

  if (byStatics) {
    let isAllowed = true;
    if (!query || Array.isArray(query)) {
      isAllowed = byStatics.some(
        (staticsKey) => !query || (query.length === 1 && staticsKey === query[0])
      );
    }
    if (query && !Array.isArray(query)) {
      isAllowed = byStatics.some((staticsKey) => staticsKey === key);
    }
    output = isAllowed;
  }

  return output;
}

export default routeIsExists;
