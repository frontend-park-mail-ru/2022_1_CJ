import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component.js';
import { EventBus, AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { ValidateInput, ValidateOnInput } from '../../core/modules/FormValidatior.js';
import { Router } from '../../core/modules/Router.js';
import { AuthController } from '../../core/network/controllers/auth.js';
import { SignupUserDTO } from '../../core/network/dto/auth.js';

export class SignupFormComponent extends Component {
  #inputs;

  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    super(template);
    this.#inputs = [];
    this.onSubmitCallback = this.onSubmit.bind(this);
  }

  addEventListeners() {
    super.addEventListeners();
     
    // TODO: refactor
    this.#inputs.push(document.getElementById('firstname'));
    this.#inputs.push(document.getElementById('lastname'));
    this.#inputs.push(document.getElementById('email'));
    this.#inputs.push(document.getElementById('password'));
    this.#inputs.push(document.getElementById('password-confirmation'));
    
    this.#inputs.forEach((input) => {
      ValidateOnInput(input);
    });

    document.getElementById('signup-form').addEventListener('submit', this.onSubmitCallback);
  }

  removeEventListeners() {
    super.removeEventListeners();
    document.getElementById('signup-form')?.removeEventListener('submit', this.onSubmitCallback);
  }

  /**
   * @param {Event} e
   */
  onSubmit(e) {
    e.preventDefault();

    for (const key in this.#inputs) {
      ValidateInput(this.#inputs[key]);
      if (this.#inputs[key].classList.contains('error')) {
        return;
      }
    }

    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const password = document.getElementById('password').value;

    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupFailure, this.onFailure.bind(this));
    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupSuccess, this.onSuccess.bind(this));
    AuthController.SignupUser(new SignupUserDTO(email, firstname, lastname, password));
  }

  onFailure() {
    // TODO:
  }

  onSuccess() {
    this.removeEventListeners();
    Router.navigateTo(URL.Login);
  }
}
