import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component.js';
import { CallbackBus, FallbackBus, Events } from '../../core/modules/EventBus.js';
import { InputNames, InputsRegistry, InputTypes } from '../../core/modules/InputsRegistry.js';
import { Router } from '../../core/modules/Router.js';
import { SignupUserDTO } from '../../core/network/dto/auth.js';
import { AuthService } from '../../core/network/services/auth.js';

export class SignupFormComponent extends Component {
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
    this.#inputsRegistry.registerInput(InputNames.FirstName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputNames.LastName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputNames.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputNames.Password, InputTypes.Password);
    this.#inputsRegistry.registerInput(InputNames.PasswordConfirmation, InputTypes.PasswordConfirmation);
    document.getElementById('form-signup').addEventListener('submit', this.onSubmitCallback);
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

    CallbackBus.subscribe(Events.AuthSignup, this.onSuccessCallback);
    FallbackBus.subscribe(Events.AuthSignup, this.onFailureCallback);
    AuthService.SignupUser(new SignupUserDTO(
      this.#inputsRegistry.value(InputNames.Email),
      this.#inputsRegistry.value(InputNames.FirstName),
      this.#inputsRegistry.value(InputNames.LastName),
      this.#inputsRegistry.value(InputNames.Password),
    ));
  }

  onFailure(args) {
    console.log(`signup failed: ${args}`);
    // TODO:
  }

  onSuccess(args) {
    this.afterDestruction();
    Router.navigateTo(URL.Login);
  }
}
