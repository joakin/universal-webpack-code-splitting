import Link from "../link";

export default ({ children }) =>
  <div>
    <h1>Header, from JS view</h1>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
    <div>
      <h2>Content area</h2>
      {children}
    </div>
  </div>;
