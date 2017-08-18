import ptr from "path-to-regexp";

export default routes => {
  const parsedRoutes = routes.map(r => {
    const keys = [];
    const re = ptr(r.path, keys);
    return {
      ...r,
      keys,
      re
    };
  });

  return {
    match(url) {
      for (const route of parsedRoutes) {
        const match = route.re.exec(url);
        if (match) {
          return route.page().then(m => ({ ...route, match, page: m }));
        }
      }
      return Promise.reject(new Error("No route matched"));
    }
  };
};

function getDefault(p) {
  return p.then(m => m.default);
}
