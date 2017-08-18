import app from "./util/app";

console.log("Hello browser");

app();

import { render } from "preact";
import Routes from "./routes";

const root = document.getElementById("root");

render(<Routes />, root, root.lastChild);
