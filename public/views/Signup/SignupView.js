import View from "../../core/models/View.js";
import { TemplatesRegistry } from "../../core/modules/Registry.js";

export default class SignupView extends View {
  constructor() {
    super(null, TemplatesRegistry.Signup);
    this.setTitle("Signup");
    this.render();
  }
}