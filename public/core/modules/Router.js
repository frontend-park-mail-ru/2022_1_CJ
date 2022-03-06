import View from '../models/View.js';

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
  #routes;

  constructor() {
    this.#routes = [];
  }

  /**
   * Set HTML Element for output
   * @param {HTMLElement} root - HTML Element for output
   */
  setRoot(root) {
    this.root = root;
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
  setNotFoundHandler(view) {
    this.notFoundHandler = view;
  }

  /**
   * Start routing and listening History changes
   */
  run() {
    if (this.#routes.length === 0) {
      throw new Error('no routes are set up');
    }

    if (!this.notFoundHandler) {
      throw new Error('not found hander is not set up');
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
    history.pushState(null, null, path);
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
      result: location.pathname.match(pathToRegex(route.path)),
    }));

    const match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    const params = getParams(match);

    const view = (match ? new match.route.view() : new this.notFoundHandler());
    view.render(root, params);
  }
}

const instance = new Router();
export { instance as Router };
