import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export default class NotFoundView extends View {
  constructor() {
    super(null, TemplatesRegistry.NotFound);
    this.setTitle('Not Found');
    this.render();
  }
}
