import { View } from '../../core/models/View/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export class FeedView extends View {
  /**
   * @constructor
   * @param  {...Function} adapters
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Feed, ...adapters);
    this.setTitle('Feed');
  }
}
