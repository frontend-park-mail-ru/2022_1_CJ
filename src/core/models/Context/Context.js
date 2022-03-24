export class Context {
  /** @member {Object} context */
  #context;

  constructor() {
    this.#context = {};
  }

  /**
   * Set context and pass it to children components.
   * @param {Object} context - context for rendering the template.
   */
  set(context) {
    this.#context = context;
  }

  /**
   * Set context and pass it to children components.
   * @param {Object} context - context for rendering the template.
   */
  append(context) {
    this.#context = {
      ...this.#context,
      ...context
    };
  }

  /**
   * @param {String} key
   * @param {Object} value
   */
  setByKey(key, value) {
    this.#context[key] = value;
  }

  /**
   * @param {String} key
   */
  getByKey(key) {
    return this.#context[key];
  }
}
