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
   * @param {HTMLElement} parent - parent HTML Element for output.
   */
  async render(parent) {
    await this.#applyAdapters();
    if (this.checkStateBeforeRender()) {
      parent.innerHTML = super.render();
      this.addEventListeners();
    } else {
      this.onInvalidState();
    }
  }

  /** Applies all the adapters. */
  async #applyAdapters() {
    for (const adapter in this.#adapters) {
      await this.#adapters[adapter](this);
    }
  }

  /**
   * Tells whether the state (i.g. context) is valid in the context of the view.
   * If redefined, onInvalidState is supposed to be redefined too.
   * @returns {Boolean}
   */
  checkStateBeforeRender() {
    return true;
  }

  /** Takes control of the flow if state turned out to be invalid. */
  onInvalidState() { }
}
