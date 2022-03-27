import { View } from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { ComponentsRegistry } from '../../core/constants/components_registry.js';

export class ProfileView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Profile, ...adapters);
    this.setTitle('Profile');
    this.addComponent('Post', new ComponentsRegistry.PostComponent(TemplatesRegistry.Post));
  }
}
