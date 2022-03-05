import View from "../../core/models/View.js";
import { TemplatesRegistry } from "../../core/modules/Registry.js";
import AuthController from "../../core/controllers/auth.js"
import { SignupUserDTO } from "../../core/dto/auth.js";

export default class LoginView extends View {
  constructor() {
    super(null, TemplatesRegistry.Login, parent);
    this.setTitle("Login");
  }

  addEventListeners() {
    super.addEventListeners();
    document.getElementById("submit").addEventListener("click", onSubmit)
  }
}

const onSubmit = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  AuthController.SignupUser(new SignupUserDTO(email, password));
}
