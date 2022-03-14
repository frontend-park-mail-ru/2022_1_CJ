import { Component } from '../../core/models/Component.js';
import { EventBus, AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { Router } from '../../core/modules/Router.js';
import { AuthController } from '../../core/network/controllers/auth.js';
import { SignupUserDTO } from '../../core/network/dto/auth.js';

export class SignupFormComponent extends Component {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   */
  constructor(template) {
    super(template);
    this.onSubmitCallback = this.onSubmit.bind(this);
  }

  addEventListeners() {
    super.addEventListeners();
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
