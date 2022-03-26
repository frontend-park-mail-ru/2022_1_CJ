import { View } from '../../core/models/View/View.js';
import { ComponentsRegistry } from '../../core/constants/components.js';

export class SignupView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(template, ...adapters) {
    super(template, ...adapters);
    this.setTitle('Signup');
    this.addComponent('SignupForm', ComponentsRegistry.SignupForm);
  }
}
