export default function app() {
  console.log("app() called in client/. Lazy loading client/lazy");
  import("./lazy").then(module => {
    module.default();
  });
}
