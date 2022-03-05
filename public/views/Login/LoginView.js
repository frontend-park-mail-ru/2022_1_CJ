import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/modules/Registry.js';
import { AuthController } from '../../core/controllers/auth.js';
import { LoginUserDTO } from '../../core/dto/auth.js';
import EventBus, { AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';

export default class LoginView extends View {
  constructor() {
    super(null, TemplatesRegistry.Login);
    this.setTitle('Login');
  }

  addEventListeners() {
    super.addEventListeners();
    document.getElementById('submit').addEventListener('click', onSubmit);
  }
}

function onSubmit() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginSuccess, onSuccess);
  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.LoginFailure, onFailure);
  AuthController.LoginUser(new LoginUserDTO(email, password));
}

function onFailure() {
  console.log('failed');
}

function onSuccess() {
  console.log('success');
}
