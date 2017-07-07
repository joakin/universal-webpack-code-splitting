universal-webpack-code-splitting
================================


An example of how to configure webpack properly for a node server that will run
client side javascript bundled by webpack.

Use `npm start` to run the bundler. Then `node dist/server/index.js` to start
the server.

For watching, run 

* `npm start -- -w`

and on another terminal
* `nodemon -w dist/ --exec "node dist/server/index.js"`
