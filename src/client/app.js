export default function app() {
  console.log("im an app");
  import("./lazy").then(module => {
    module.default();
  });
}
