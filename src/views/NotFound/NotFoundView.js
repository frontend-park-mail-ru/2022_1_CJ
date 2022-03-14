import { View } from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export class NotFoundView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.NotFound, ...adapters);
    this.setTitle('Not Found');
  }
}
