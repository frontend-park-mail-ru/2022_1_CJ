import { View } from '../models/View.js';

const ParameterRegExp = /:(\w+)/g;
const SolidStringPattern = '(.+)';
const EscapedURLDelimiter = '\\/';

const pathToRegex = (path) => new RegExp(`^${path
  .replaceAll('/', EscapedURLDelimiter)
  .replace(ParameterRegExp, SolidStringPattern)}$`);

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(ParameterRegExp)).map((result) => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

class Route {
  /** @member {String} path */
  path;

  /**
   * @param {String} path
   */
  constructor(path) {
    this.path = path;
  }
}

class ViewRoute extends Route {
  /** @member {View} view */
  view;

  /**
   * @param {String} path
   * @param {View} view
   */
  constructor(path, view) {
    super(path);
    this.view = view;
  }
}

class ActionRoute extends Route {
  /** @member {Function} action */
  action;

  /**
   * @param {String} path
   * @param {Function} action
   */
  constructor(path, action) {
    super(path);
    this.action = action;
  }
}

class Router {
  /** @member {HTMLElement} root */
  #root;

  /** @member {Route[]} routes */
  #routes;

  /** @member {View} notFoundView */
  #notFoundView;

  constructor() {
    this.#routes = [];
  }

  /**
   * Set HTML Element for output.
   * @param {HTMLElement} root - HTML Element for output.
   */
  setRoot(root) {
    this.#root = root;
  }

  /**
   * Add route with the given path and view.
   * @param {String} path - route's path.
   * @param {View} view - route's view.
   */
  setViewRoute(path, view) {
    this.#routes.push(new ViewRoute(path, view));
  }

  /**
   * Add route with the given path and view.
   * @param {String} path - route's path.
   * @param {Function} action - route's action.
   */
  setActonRoute(path, action) {
    this.#routes.push(new ActionRoute(path, action));
  }

  /**
   * Set view for not found routes.
   * @param {View} view - not found page's view.
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

  /**
   * @param {Event} event
   */
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
    const match = this.#routes.find((route) => window.location.pathname.match(pathToRegex(route.path)) !== null);
    if (match instanceof ViewRoute) {
      match.view.render(this.#root);
    } else if (match instanceof ActionRoute) {
      match.action();
    } else {
      this.#notFoundView.render(this.#root);
    }
  }
}

const instance = new Router();
export { instance as Router };
