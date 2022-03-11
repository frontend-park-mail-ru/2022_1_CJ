export default class Component {
  context; // TODO: make a way to keep it private
  #template;

  /**
   * @constructor
   * @param {Object} context - context for rendering the template
   * @param {Function} template - function for generating the HTML
   */
  constructor(context, template) {
    this.context = context || {};
    this.#template = template;

    // Children components of the component
    this.subComponents = {};
    // Children list components of the component
    this.subComponentsLists = {};
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
   * Produce HTML
   * @return {String} - produced HTML
   */
  render(context = this.context) {
    const contextWithComponents = { ...this.#renderComponents(context), ...context };
    return this.#template(contextWithComponents);
  }

  /**
   * Recursively add event listeners
   */
  addEventListeners() {
    Object.values(this.subComponents).forEach((component) => {
      component.addEventListeners();
    });

    Object.values(this.subComponentsLists).forEach((componentList) => {
      componentList.forEach((component) => {
        component.addEventListeners();
      });
    });
  }

  /**
   * Recursively remove event listeners
   */
  removeEventListeners() {
    Object.values(this.subComponents).forEach((component) => {
      component.removeEventListeners();
    });

    Object.values(this.subComponentsLists).forEach((componentList) => {
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
   * @return {Component[]}
   */
  #renderComponents(context) {
    const renderedComponents = Object
      .entries(this.subComponents)
      .reduce((obj, [name, component]) => ({
        ...obj,
        [name]: component.render(context),
      }), {});

    const renderedLists = Object
      .entries(this.subComponentsLists)
      .reduce((obj, [name, list]) => ({
        ...obj,
        [name]: list.map((component) => component.render(context)),
      }), {});

    return { ...renderedComponents, ...renderedLists };
  }
}
