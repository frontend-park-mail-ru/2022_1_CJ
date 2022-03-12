export class Component {
  /** @member {Function} template - is a function that returns HTML provided some context Object. */
  #template;

  /** @member {Object} context - is an object containing information for rendering a template. */
  #context;

  /** @member {Object} subComponents  - children components of the component. */
  #subComponents;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    this.#context = {};
    this.#template = template;
    this.#subComponents = {};
  }

  /**
   * Set context and pass it to children components.
   * @param {Object} context - context for rendering the template.
   */
  setContext(context) {
    this.#context = context;
    this.#subComponents.forEach((component) => {
      component.context = this.#context;
    });
  }

  /**
   * @param {String} key
   * @param {Object} value 
   */
  setContextByKey(key, value) {
    this.#context[key] = value;
  }

  /**
   * @param {String} name - name of the component.
   * @param {Component} component - the component.
   */
  addComponent(name, component) {
    this.#subComponents[name] = component;
  }

  /**
   * Produce HTML. Context is supposed to be set before rendering.
   * @return {String} - produced HTML.
   */
  render() {
    const contextWithComponents = { ...this.#renderComponents(), ...this.#context };
    return this.#template(contextWithComponents);
  }

  /**
   * Recursively add event listeners.
   * If redefined, super method is supposed to be called.
   */
  addEventListeners() {
    Object.values(this.#subComponents).forEach((component) => {
      component.addEventListeners();
    });
  }

  /**
   * Recursively remove event listeners.
   * If redefined, super method is supposed to be called.
   */
  removeEventListeners() {
    Object.values(this.#subComponents).forEach((component) => {
      component.removeEventListeners();
    });
  }

  /**
   * @return {Component[]}
   */
  #renderComponents() {
    const renderedComponents = Object
      .entries(this.#subComponents)
      .reduce((obj, [name, component]) => ({
        ...obj,
        [name]: component.render(),
      }), {});

    return { ...renderedComponents };
  }
}
