import AbstractView from "./AbstractView.js";
import '../components/NotFound/NotFound.js'

export default class extends AbstractView {
  constructor(state) {
    super(state);
    this.setTitle("Not Found");
  }

  async getHTML() {
    return Handlebars.templates.NotFound(this.state);
  }
}