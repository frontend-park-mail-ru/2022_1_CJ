import { View } from '../../models/View/View.js';

const ParameterRegExp = /:(\w+)/g;
const SolidStringPattern = '(.+)';
const EscapedURLDelimiter = '\\/';

const pathToRegex = (path) =>
  new RegExp(`^${path.replaceAll('/', EscapedURLDelimiter).replace(ParameterRegExp, SolidStringPattern)}$`);

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(ParameterRegExp)).map((result) => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

class Router {
  /** @member {HTMLElement} root */
  #root;

  /** @member {Object[]} routes */
  #routes;

  /** @member {View} notFoundController */
  #notFoundController;

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

  route(path, controller) {
    this.#routes.push({ path, controller });
  }

  /**
   * Set controller for not found routes.
   * @param {Controller} controller - not found page's controller.
   */
  setNotFoundController(controller) {
    this.#notFoundController = controller;
  }

  /**
   * Start routing and listening History changes
   */
  run() {
    if (this.#routes.length === 0) {
      throw new Error('no routes are set up');
    }

    if (!this.#notFoundController) {
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
    if (match) {
      match.controller.handle({ root: this.#root });
    } else {
      this.#notFoundController.handle({ root: this.#root });
    }
  }
}

const instance = new Router();
export { instance as Router };
