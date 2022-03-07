import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export default class FeedView extends View {
  constructor() {
    super(null, TemplatesRegistry.Feed);
    this.setTitle('Feed');
  }
}

const instance = new FeedView();
export { instance as FeedView };
