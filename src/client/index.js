import app from "./app";

console.log("Hello browser");

app();

import { render } from "preact";
import App from "./components/app";

const root = document.getElementById("root");

render(<App />, root, root.lastChild);
