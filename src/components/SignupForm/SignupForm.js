import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component/Component.js';
import { CallbackBus, FallbackBus } from '../../core/modules/EventBus/EventBus.js';
import { Events } from '../../core/modules/EventBus/Events.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
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
    this.#inputsRegistry.registerInput(InputIDs.FirstName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputIDs.LastName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputIDs.Password, InputTypes.Password);
    this.#inputsRegistry.registerInput(InputIDs.PasswordConfirmation, InputTypes.PasswordConfirmation);
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
    AuthService.SignupUser(
      new SignupUserDTO(
        this.#inputsRegistry.value(InputIDs.Email),
        this.#inputsRegistry.value(InputIDs.FirstName),
        this.#inputsRegistry.value(InputIDs.LastName),
        this.#inputsRegistry.value(InputIDs.Password)
      )
    );
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
