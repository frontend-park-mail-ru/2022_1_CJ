import AbstractView from "./AbstractView.js";
import '../components/Signup/Signup.js'

export default class extends AbstractView {
  constructor(state) {
    super(state);
    this.setTitle("Signup");
  }

  async getHTML() {
    return Handlebars.templates.Signup(this.state);
  }
}