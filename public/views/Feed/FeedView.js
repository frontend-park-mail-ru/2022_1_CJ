import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';
import { UserAPI } from '../../core/api/user.js';
import { Router } from '../../core/modules/Router.js';
import { URL } from '../../core/constants/constants.js';

export class FeedView extends View {
  constructor() {
    super(null, TemplatesRegistry.Feed);
    this.setTitle('Feed');
  }
}
