import { ContextKey, URL } from '../../core/constants/constants.js';
import { AuthController } from '../../core/controllers/auth.js';
import { SignupUserDTO } from '../../core/dto/auth.js';
import { View } from '../../core/models/View.js';
import { EventBus, AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { Router } from '../../core/modules/Router.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export class SignupView extends View {
  /**
   * @constructor
   * @param {Function} template - function for generating the HTML.
   * @param  {...Function} adapters 
   */
  constructor(...adapters) {
    super(TemplatesRegistry.Signup, ...adapters);
    this.setTitle('Signup');
    this.onSubmitCallback = this.onSubmit.bind(this);
  }

  checkStateBeforeRender() {
    return this.getContextByKey(ContextKey.IsAuthorized) == false;
  }

  onInvalidState() {
    Router.navigateTo(URL.Feed);
  }

  addEventListeners() {
    super.addEventListeners();
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
