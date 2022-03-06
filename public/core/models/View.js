import { TemplatesRegistry } from '../modules/Registry.js';
import Component from './Component.js';

export default class View extends Component {
  /**
   * @constructor
   * @param {Object} context - context for rendering the template
   * @param {Function} template - function for generating the HTML
   */
  constructor(context, template) {
    super(context, template);
    this.addComponent('header', new Component(null, TemplatesRegistry.Header));
  }

  /**
   * @param {HTMLElement} parent - parent HTML Element for output
   */
  render(parent) {
    parent.innerHTML = super.render();
    this.addEventListeners();
  }

  /**
   * Set document's title
   * @param {String} title
   */
  setTitle(title) {
    document.title = title;
  }
}
