export default [
  {
    path: "/",
    page: () => import("./pages/index")
  },
  {
    path: "/about",
    page: () => import("./pages/about")
  }
];
