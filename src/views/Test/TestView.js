import { ContextKey, URL } from '../../core/constants/constants.js';
import { View } from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { ComponentsRegistry } from '../../core/constants/components_registry.js';

export class TestView extends View {
  /**
   * @constructor
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Test, ...adapters);
    this.setTitle('Test');
    this.addComponent('SignupForm', new ComponentsRegistry.SignupFormComponent(TemplatesRegistry.SignupForm));
    this.addComponent('Post', new ComponentsRegistry.PostComponent(TemplatesRegistry.Post));
    this.addComponent('Menu', new ComponentsRegistry.MenuComponent(TemplatesRegistry.Menu));
  }
}
