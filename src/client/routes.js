import Router from "preact-router";

import Index from "./pages/index";
import About from "./pages/about";

export default ({ url }) =>
  <Router url={url}>
    <Index path="/" />
    <About path="/about" />
  </Router>;

// <Search path="/search/:query/:advanced?" />
