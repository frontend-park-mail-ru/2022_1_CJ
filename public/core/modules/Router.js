const ParameterRegExp = /:(\w+)/g;
const SolidStringPattern = '(.+)';
const EscapedURLDelimiter = '\\/';

const pathToRegex = (path) => new RegExp(`^${path.replaceAll('/', EscapedURLDelimiter).replace(ParameterRegExp, SolidStringPattern)}$`);

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(ParameterRegExp)).map((result) => result[1]);

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

class Router {
  #root;

  #routes;

  #notFoundView;

  constructor() {
    this.#routes = [];
  }

  /**
   * Set HTML Element for output
   * @param {HTMLElement} root - HTML Element for output
   */
  setRoot(root) {
    this.#root = root;
  }

  /**
   * Add route with the given path and view
   * @param {String} path - route's path
   * @param {View} view - route's view
   */
  setRoute(path, view) {
    this.#routes.push({ path, view });
  }

  /**
   * Set view for not found routes
   * @param {View} view - not found page's view
   */
  setNotFoundView(view) {
    this.#notFoundView = view;
  }

  /**
   * Start routing and listening History changes
   */
  run() {
    if (this.#routes.length === 0) {
      throw new Error('no routes are set up');
    }

    if (!this.#notFoundView) {
      throw new Error('not found view is not set up');
    }

    this.#route();
    window.onpopstate = this.#handlePopState.bind(this);
    document.body.onclick = this.#handleClick.bind(this);
  }

  /**
   * Push State with the path and route to it
   * @param {String} path - path to navigate to
   */
  async navigateTo(path) {
    window.history.pushState(null, null, path);
    this.#route();
  }

  async #handleClick(event) {
    if (event.target.matches('[data-link]')) {
      event.preventDefault();
      this.navigateTo(event.target.href);
    }
  }

  async #handlePopState() {
    this.#route();
  }

  async #route() {
    const potentialMatches = this.#routes.map((route) => ({
      route,
      result: window.location.pathname.match(pathToRegex(route.path)),
    }));

    const match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    const view = (match ? match.route.view : this.#notFoundView);
    view.render(this.#root);
  }
}

const instance = new Router();
export { instance as Router };
