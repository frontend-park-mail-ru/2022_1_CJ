import { View } from '../../core/models/View/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { ComponentsRegistry } from '../../core/constants/components_registry.js';

export class LoginView extends View {
  /**
   * @constructor
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Login, ...adapters);
    this.setTitle('Login');
    this.addComponent('LoginForm', ComponentsRegistry.LoginForm);
  }
}
