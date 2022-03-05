export default class Component {
  /**
   * @constructor
   * @param {Object} context - context for rendering the template
   * @param {Function} template - function for generating the HTML
   */
  constructor(context, template) {
    this.context = context;
    this.template = template;

    // Children components of the component
    this.subComponents = new Map();
    // Children list components of the component
    this.subComponentsLists = new Map();
  }

  /**
   * Set context and pass it to children components
   * @param {Object} context
   */
  setContext(context) {
    this.context = context;

    this.subComponents.forEach((component) => {
      component.context = this.context;
    });

    this.subComponentsLists.forEach((componentList) => {
      componentList.forEach((component) => {
        component.context = this.context;
      });
    });
  }

  /**
   * Update given component's context
   * @param {String} name - component's name
   * @param {Object} context - new context
   */
  setContextByComponentName(name, context) {
    this.subComponents.get(name).setContext(context);
  }

  /**
   * Produce HTML
   * @return {String} - produced HTML
   */
  render() {
    const contextWithComponents = { ...this.#renderComponents(), ...this.context };
    return this.template(contextWithComponents);
  }

  /**
   * Recursively add event listeners
   */
  addEventListeners() {
    this.subComponents.forEach((component) => {
      component.addEventListeners();
    });

    this.subComponentsLists.forEach((componentList) => {
      componentList.forEach((component) => {
        component.addEventListeners();
      });
    });
  }

  /**
   * Recursively remove event listeners
   */
  removeEventListeners() {
    this.subComponents.forEach((component) => {
      component.removeEventListeners();
    });

    this.subComponentsLists.forEach((componentList) => {
      componentList.forEach((component) => {
        component.removeEventListeners();
      });
    });
  }

  /**
   * @param {String} name - name of the component
   * @param {Component} component - the component
   */
  addComponent(name, component) {
    this.subComponents[name] = component;
  }

  /**
   * @param {String} name - name of the component list
   * @param {Component} component - the component
   */
  addComponentToList(name, component) {
    if (!this.subComponentsLists.name) {
      this.subComponentsLists[name] = [];
    }
    this.subComponentsLists[name].push(component);
  }

  /**
   * @param {String} name - name of the component list
   */
  removeComponentsList(name) {
    delete this.subComponentsLists[name];
  }

  /**
   * @returns {Component[]}
   */
  #renderComponents() {
    const renderedComponents = Object
      .entries(this.subComponents)
      .reduce((obj, [name, component]) => ({
        ...obj,
        [name]: component.render(),
      }), {});

    const renderedLists = Object
      .entries(this.subComponentsLists)
      .reduce((obj, [name, list]) => ({
        ...obj,
        [name]: list.map((component) => component.render()),
      }), {});

    return { ...renderedComponents, ...renderedLists };
  }
}
