import './templates/Header.js'
import { authMiddleware } from '../js/utils/middlewares.js';

export default class {
  constructor(state = {}) {
    this.state = authMiddleware(state);
  }

  setTitle(title) {
    document.title = title;
  }

  async GetHTML() {
    return this.wrapHTML();
  }

  async wrapHTML(html) {
    return Handlebars.templates.Header(this.state) + await this.getHTML();
  }

  async getHTML() {
    return "";
  }
}
