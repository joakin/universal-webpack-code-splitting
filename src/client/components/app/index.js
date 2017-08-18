import { Link } from "preact-router/match";

export default ({ children }) =>
  <div>
    <h1>Header, from JS view</h1>
    <ul>
      <li>
        <Link activeClassName="active" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link activeClassName="active" href="/about">
          About
        </Link>
      </li>
    </ul>
    <div>
      <h2>Content area</h2>
      {children}
    </div>
  </div>;
