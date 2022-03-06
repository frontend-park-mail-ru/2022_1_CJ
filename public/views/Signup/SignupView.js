import { URL } from '../../core/constants.js';
import { AuthController } from '../../core/controllers/auth.js';
import { SignupUserDTO } from '../../core/dto/auth.js';
import View from '../../core/models/View.js';
import { EventBus, AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { TemplatesRegistry } from '../../core/modules/Registry.js';
import { Router } from '../../core/modules/Router.js';

export default class SignupView extends View {
  constructor() {
    super(null, TemplatesRegistry.Signup);
    this.setTitle('Signup');
    this.onSubmitCallback = this.onSubmit.bind(this);
  }

  addEventListeners() {
    super.addEventListeners();
    document.getElementById('submit').addEventListener('click', this.onSubmitCallback);
  }

  removeEventListeners() {
    super.removeEventListeners();
    document.getElementById('submit')?.removeEventListener('click', this.onSubmitCallback);
  }

  onSubmit() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupFailure, this.onFailure.bind(this));
    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupSuccess, this.onSuccess.bind(this));
    AuthController.SignupUser(new SignupUserDTO(email, password));
  }

  onFailure() {
    console.log('failed');
  }

  onSuccess() {
    console.log('success');
    this.removeEventListeners();
    Router.navigateTo(URL.Login);
  }
}
