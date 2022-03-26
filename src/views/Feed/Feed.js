import { View } from '../../core/models/View/View.js';
import { ComponentsRegistry } from '../../components/registry.js';

export class FeedView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(template, ...adapters) {
    super(template, ...adapters);
    this.setTitle('Feed');
    this.addComponent('Post', ComponentsRegistry.Post);
  }
}
