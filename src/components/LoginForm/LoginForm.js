import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component/Component.js';
import { CallbackBus, FallbackBus } from '../../core/modules/EventBus/EventBus.js';
import { Events } from '../../core/modules/EventBus/Events.js';
import { InputNames, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';
import { AuthService } from '../../core/network/services/auth.js';

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
    this.#inputsRegistry.registerInput(InputNames.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputNames.Password, InputTypes.Required);
    document.getElementById('form-login').addEventListener('submit', this.onSubmitCallback);
    super.afterRender();
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
    AuthService.LoginUser(new LoginUserDTO(
      this.#inputsRegistry.value(InputNames.Email),
      this.#inputsRegistry.value(InputNames.Password),
    ));
  }

  onFailure(args) {
    console.log(`login failed: ${args}`);
    // TODO:
  }

  onSuccess(args) {
    this.afterDestruction();
    Router.navigateTo(URL.Feed);
  }
}
