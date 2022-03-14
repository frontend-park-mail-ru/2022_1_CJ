import { ContextKey, URL } from '../../core/constants/constants.js';
import { View } from '../../core/models/View.js';
import { Router } from '../../core/modules/Router.js';
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
    this.addComponent('LoginForm', new ComponentsRegistry.LoginFormComponent(TemplatesRegistry.LoginForm));
  }

  checkStateBeforeRender() {
    return this.getContextByKey(ContextKey.IsAuthorized) !== true;
  }

  onInvalidState() {
    Router.navigateTo(URL.Feed);
  }
}
