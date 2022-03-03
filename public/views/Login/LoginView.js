import AbstractView from "../AbstractView.js";
import '../templates/Login.js'

export default class extends AbstractView {
  constructor(state) {
    super(state);
    this.setTitle("Login");
  }

  async getHTML() {
    return Handlebars.templates.Login(this.state);
  }
}