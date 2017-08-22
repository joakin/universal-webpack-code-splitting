import app from "./util/app";

console.log("Hello browser");

app();

import { render, Component } from "preact";
import createHistory from "history/createBrowserHistory";
import routes from "./routes";
import createRouter from "./router";

const root = document.getElementById("root");
const history = (window.h = createHistory());
const router = createRouter(routes);

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  renderApp();
});

renderApp();

function renderApp() {
  router.match(history.location.pathname).then(({ Page, props }) => {
    console.log('Re-render', props)
    render(
      <WithContext>
        <Page {...props} history={history} />
      </WithContext>,
      root,
      root.lastChild
    );
  });
}

class WithContext extends Component {
  getChildContext() {
    return { history };
  }
  render({ children }) {
    return children[0];
  }
}
