import { Component } from './Component.js';

export class View extends Component {
  /** @member {Function[]} adapters - functions to be called before rendering to obtain a context. */
  #adapters;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters 
   */
  constructor(template, ...adapters) {
    super(template);
    this.#adapters = adapters;
    // TODO: move to adapters
    // this.addComponent('header', new ComponentsRegistry.HeaderComponent(null, TemplatesRegistry.Header));
  }

  /**
   * Set document's title.
   * @param {String} title
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * Call adapters, super render method and add event listeners.
   * @param {HTMLElement} parent - parent HTML Element for output
   */
  async render(parent) {
    this.#adapters.forEach((adapter) => {
      adapter(this);
    });
    parent.innerHTML = super.render();
    this.addEventListeners();
  }
}
