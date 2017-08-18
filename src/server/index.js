import express from "express";
import fs from "fs";
import path from "path";
import render from "preact-render-to-string";
import app from "../client/util/app";
import Routes from "../client/routes";

console.log("Starting server");

// Calling client side code that has lazy loading/code splitting
app();

const server = express();

const assets = readJSON("dist/client/assets-manifest.json");
const chunkManifest = readJSON("dist/client/chunk-manifest.json");

const tpl = ({ html = "" }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8"/>
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Test</title>
  <!-- <link rel="manifest" href="./manifest.json">
  <!-- <link href="./css/main.24249049.css" rel="stylesheet"> -->
  <!-- link preload chunks and other entry points? Example: -->
  <!-- Could be in response headers or server push on http2 -->
  ${Object.keys(assets)
    .map(key => {
      const files = assets[key];
      return files["js"]
        ? `<link rel="preload" href="${files.js}" as="script">`
        : "";
    })
    .join("\n")}
  ${Object.keys(chunkManifest)
    .map(key => `<link rel="preload" href="${chunkManifest[key]}" as="script">`)
    .join("\n")}
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="text/javascript">
    window.webpackManifest = ${JSON.stringify(chunkManifest)}
    </script>
    <script type="text/javascript" src="./${assets.index.js}"></script>
  </body>
</html>
`;

// Serve webpack generated assets, needs to be before the route *
server.use(express.static("./dist/client"));

server.get("*", (req, res) =>
  res.status(200).send(
    tpl({
      html: render(<Routes url={req.url} />)
    })
  )
);

const port = process.env.PORT || 3000;
server.listen(port, _ => console.log(`Server listening on port ${port}!`));

function readJSON(p) {
  return JSON.parse(fs.readFileSync(path.resolve(p)).toString());
}
