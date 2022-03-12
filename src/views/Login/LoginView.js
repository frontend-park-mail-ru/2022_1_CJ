import { View } from '../../core/models/View.js';
import { AuthController } from '../../core/controllers/auth.js';
import { LoginUserDTO } from '../../core/dto/auth.js';
import { EventBus, AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { URL } from '../../core/constants/constants.js';
import { Router } from '../../core/modules/Router.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export class LoginView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters 
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Login, ...adapters);
    this.setTitle('Login');
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
    const password = document.getElementById('password').value;

    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginFailure, this.onFailure.bind(this));
    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginSuccess, this.onSuccess.bind(this));
    AuthController.LoginUser(new LoginUserDTO(email, password));
  }

  onFailure() {
    // TODO:
  }

  onSuccess() {
    this.removeEventListeners();
    Router.navigateTo(URL.Feed);
  }
}
