import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component/Component.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { SignupUserDTO } from '../../core/network/dto/auth.js';
import { userActions, userStore, userThunks } from '../../stores/UserStore.js';

export class SignupFormComponent extends Component {
  #inputsRegistry;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    super(template);
    this.#inputsRegistry = new InputsRegistry();
  }

  afterRender() {
    this.#inputsRegistry.registerInput(InputIDs.FirstName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputIDs.LastName, InputTypes.Required);
    this.#inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputIDs.Password, InputTypes.Password);
    this.#inputsRegistry.registerInput(InputIDs.PasswordConfirmation, InputTypes.PasswordConfirmation);
    document.getElementById('form-signup').addEventListener('submit', this.onSubmit.bind(this));
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

    userStore.dispatch(
      userThunks.signup(
        new SignupUserDTO(
          this.#inputsRegistry.value(InputIDs.Email),
          this.#inputsRegistry.value(InputIDs.FirstName),
          this.#inputsRegistry.value(InputIDs.LastName),
          this.#inputsRegistry.value(InputIDs.Password)
        )
      )
    );

    userStore.once(({ type, payload }) => {
      switch (type) {
        case userActions.signupSuccess:
          Router.navigateTo(URL.Feed);
          break;
        case userActions.signupFailure:
          console.log(payload.err);
          break;
      }
    });
  }
}
