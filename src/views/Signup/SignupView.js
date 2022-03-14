import { ContextKey, URL } from '../../core/constants/constants.js';
import { View } from '../../core/models/View.js';
import { Router } from '../../core/modules/Router.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { ComponentsRegistry } from '../../core/constants/components_registry.js';

export class SignupView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Signup, ...adapters);
    this.setTitle('Signup');
    this.addComponent('SignupForm', new ComponentsRegistry.SignupFormComponent(TemplatesRegistry.SignupForm));
  }

  checkStateBeforeRender() {
    return this.getContextByKey(ContextKey.IsAuthorized) !== false;
  }

  onInvalidState() {
    Router.navigateTo(URL.Feed);
  }
}
