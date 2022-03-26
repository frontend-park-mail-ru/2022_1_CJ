import { View } from '../../core/models/View/View.js';

export class NotFoundView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters
   */
  constructor(template, ...adapters) {
    super(template, ...adapters);
    this.setTitle('Not Found');
  }
}
