import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component.js';
import { CallbackBus, FallbackBus, Events } from '../../core/modules/EventBus.js';
import { InputsRegistry } from '../../core/modules/InputsRegistry.js';
import { Router } from '../../core/modules/Router.js';
import { AuthController } from '../../core/network/controllers/auth.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';

export class LoginFormComponent extends Component {
  #inputsRegistry;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    super(template);
    this.#inputsRegistry = new InputsRegistry();
    this.onSubmitCallback = this.onSubmit.bind(this);
    this.onSuccessCallback = this.onSuccess.bind(this);
    this.onFailureCallback = this.onFailure.bind(this);
  }

  afterRender() {
    super.afterRender();

    this.#inputsRegistry.registerInput(InputNames.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputNames.Password, InputTypes.Password);

    document.getElementById('login-form').addEventListener('submit', this.onSubmitCallback);
  }

  afterDestruction() {
    document.getElementById('login-form')?.removeEventListener('submit', this.onSubmitCallback);
    super.afterDestruction();
  }

  /**
   * @param {Event} e
   */
  onSubmit(e) {
    e.preventDefault();

    if (!this.#inputsRegistry.checkAll()) {
      return;
    }

    CallbackBus.subscribe(Events.AuthLogin, this.onSuccessCallback);
    FallbackBus.subscribe(Events.AuthLogin, this.onFailureCallback);
    AuthController.LoginUser(new LoginUserDTO(
      this.#inputsRegistry.value(InputNames.Email),
      this.#inputsRegistry.value(InputNames.Password),
    ));
  }

  onFailure(args) {
    console.log(`login failed: ${args}`);
    // TODO:
  }

  onSuccess() {
    this.afterDestruction();
    Router.navigateTo(URL.Feed);
  }
}
