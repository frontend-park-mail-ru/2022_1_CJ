import { ContextKey, URL } from '../../core/constants/constants.js';
import { View } from '../../core/models/View/View.js';
import { Router } from '../../core/modules/Router/Router.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { ComponentsRegistry } from '../../core/constants/components_registry.js';

export class SignupView extends View {
  /**
   * @constructor
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Signup, ...adapters);
    this.setTitle('Signup');
    this.addComponent('SignupForm', new ComponentsRegistry.SignupFormComponent(TemplatesRegistry.SignupForm));
  }
}
