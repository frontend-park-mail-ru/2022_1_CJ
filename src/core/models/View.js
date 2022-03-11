import Component from './Component.js';
import { TemplatesRegistry } from '../constants/templates_registry.js';
import { UserAPI } from '../api/user.js';
import { ComponentsRegistry } from '../constants/components_registry.js';

export default class View extends Component {
  /**
   * @constructor
   * @param {Object} context - context for rendering the template
   * @param {Function} template - function for generating the HTML
   */
  constructor(context, template) {
    super(context, template);
    this.addComponent('header', new ComponentsRegistry.HeaderComponent(null, TemplatesRegistry.Header));
  }

  /**
   * @param {HTMLElement} parent - parent HTML Element for output
   */
  async render(parent) {

    // TODO: a complete mess
    const [json, _] = await UserAPI.GetUserData(null);
    if (json != null) {
      this.context["user"] = json["user"];
      this.context["authorized"] = true;
    } else {
      this.context["user"] = null;
      this.context["authorized"] = false;
    }
    //

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
