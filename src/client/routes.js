export default [
  {
    path: "/",
    page: () => import(/* webpackChunkName: "pages/index" */ "./pages/index"),
    chunkName: "pages/index"
  },
  {
    path: "/about",
    page: () => import(/* webpackChunkName: "pages/about" */ "./pages/about"),
    chunkName: "pages/about"
  }
];
