import express from "express";
import fs from "fs";
import path from "path";
import render from "preact-render-to-string";
import app from "../client/app";
import App from "../client/components/app";

console.log("Hello server");

// Calling client side code that has lazy loading/code splitting
app();

const server = express();

const assets = JSON.parse(readJSON("dist/client/assets-manifest.json"));
const chunkManifest = readJSON("dist/client/chunk-manifest.json");

const tpl = () => `
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
  ${Object.entries(assets)
    .map(
      ([entry, files]) =>
        files["js"] ? `<link rel="preload" href="${files.js}" as="script">` : ""
    )
    .join("\n")}
  ${Object.values(JSON.parse(chunkManifest))
    .map(file => `<link rel="preload" href="${file}" as="script">`)
    .join("\n")}
  </head>
  <body>
    <div id="root">${render(<App />)}</div>
    <script type="text/javascript">
    window.webpackManifest = ${chunkManifest}
    </script>
    <script type="text/javascript" src="./${assets.index.js}"></script>
  </body>
</html>
`;

server.get("/", (req, res) => res.status(200).send(tpl()));

// Serve webpack generated assets
server.use(express.static("./dist/client"));

const port = process.env.PORT || 3000;
server.listen(port, _ => console.log(`Server listening on port ${port}!`));

function readJSON(p) {
  return fs.readFileSync(path.resolve(p)).toString();
}
