import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component.js';
import { CallbackBus, FallbackBus, Events } from '../../core/modules/EventBus.js';
import { ValidateInput, ValidateOnInput } from '../../core/modules/InputValidator.js';
import { Router } from '../../core/modules/Router.js';
import { AuthController } from '../../core/network/controllers/auth.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';

export class LoginFormComponent extends Component {
  #inputs;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    super(template);
    this.#inputs = [];
    this.onSubmitCallback = this.onSubmit.bind(this);
    this.onSuccessCallback = this.onSuccess.bind(this);
    this.onFailureCallback = this.onFailure.bind(this);
  }

  addEventListeners() {
    super.addEventListeners();

    this.#inputs.push(document.getElementById('email'));
    this.#inputs.push(document.getElementById('password'));

    this.#inputs.forEach((input) => {
      ValidateOnInput(input);
    });

    document.getElementById('login-form').addEventListener('submit', this.onSubmitCallback);
  }

  removeEventListeners() {
    super.removeEventListeners();
    document.getElementById('login-form')?.removeEventListener('submit', this.onSubmitCallback);
  }

  /**
   * @param {Event} e
   */
  onSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    CallbackBus.subscribe(Events.AuthLogin, this.onSuccessCallback);
    FallbackBus.subscribe(Events.AuthLogin, this.onFailureCallback);

    AuthController.LoginUser(new LoginUserDTO(email, password));
  }

  onFailure(args) {
    console.log(`login failed: ${args}`);
    // TODO:
  }

  onSuccess() {
    this.removeEventListeners();
    Router.navigateTo(URL.Feed);
  }
}
