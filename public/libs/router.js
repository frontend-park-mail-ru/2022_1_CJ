const ParameterRegExp = /:(\w+)/g;
const SolidStringPattern = "(.+)";
const EscapedURLDelimiter = "\\/";

const pathToRegex = (path) => {
  return new RegExp("^" + path.replaceAll("/", EscapedURLDelimiter).replace(ParameterRegExp, SolidStringPattern) + "$");
}

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(ParameterRegExp)).map((result) => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

export default class Router {
  constructor(root) {
    this.root = root;
    this.routes = [];
  }

  setRoute(path, handler) {
    this.routes.push({ path, handler });
  }

  setNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  run() {
    if (this.routes.length === 0) {
      throw new Error("no routes are set up");
    }

    if (!this.notFoundHandler) {
      throw new Error("not found hander is not set up");
    }

    this.#route();
    window.addEventListener("popstate", this.#handlePopState);
    document.body.addEventListener("click", this.#handleClick);
  }

  async #handleClick(event) {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      this.#navigateTo(event.target.href);
    }
  }

  async #handlePopState() {
    this.#route();
  }

  async #navigateTo(url) {
    history.pushState(null, null, url);
    this.#route();
  }

  async #route() {
    const potentialMatches = this.routes.map((route) => {
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
      };
    });

    const match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    // const params = getParams(match);

    const view = (match ? new match.route.handler() : new this.notFoundHandler());
    this.root.innerHTML = await view.GetHTML();
  }

}