import '../components/Header/Header.js'
import '../components/Footer/Footer.js'

export default class {
  constructor(state) {
    this.state = state;
  }

  setTitle(title) {
    document.title = title;
  }

  async GetHTML() {
    return this.wrapHTML();
  }

  async wrapHTML(html) {
    return Handlebars.templates.Header(this.state) + await this.getHTML() + Handlebars.templates.Footer(this.state);
  }

  async getHTML() {
    return "";
  }
}
