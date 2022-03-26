import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component/Component.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';
import { userActions, userStore, userThunks } from '../../stores/UserStore.js';

export class LoginFormComponent extends Component {
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
    this.#inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    this.#inputsRegistry.registerInput(InputIDs.Password, InputTypes.Required);
    document.getElementById('form-login').addEventListener('submit', this.onSubmit.bind(this));
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
      userThunks.login(
        new LoginUserDTO(this.#inputsRegistry.value(InputIDs.Email), this.#inputsRegistry.value(InputIDs.Password))
      )
    );

    userStore.once(({ type, payload }) => {
      switch (type) {
        case userActions.loginSuccess:
          Router.navigateTo(URL.Feed);
          break;
        case userActions.loginFailure:
          console.log(payload.err);
          break;
      }
    });
  }
}
