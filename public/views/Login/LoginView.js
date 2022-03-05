import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/modules/Registry.js';
import { AuthController } from '../../core/controllers/auth.js';
import { LoginUserDTO } from '../../core/dto/auth.js';
import EventBus, { AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { URL } from '../../core/constants.js';

export default class LoginView extends View {
  constructor() {
    super(null, TemplatesRegistry.Login);
    this.setTitle('Login');
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

    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginFailure, this.onFailure.bind(this));
    EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginSuccess, this.onSuccess.bind(this));
    AuthController.LoginUser(new LoginUserDTO(email, password));
  }

  onFailure() {
    console.log('failed');
  }

  onSuccess() {
    console.log('success');
    this.removeEventListeners();
    Router.navigateTo(URL.Feed);
  }
}
