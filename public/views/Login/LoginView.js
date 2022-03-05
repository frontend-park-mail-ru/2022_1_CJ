import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/modules/Registry.js';
import { AuthController } from '../../core/controllers/auth.js';
import { SignupUserDTO } from '../../core/dto/auth.js';
import EventBus, { AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';

const onFailure = () => {
  console.log('failed');
};

const onSuccess = () => {
  console.log('success');
};

const onSubmit = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupFailure, onFailure);
  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupSuccess, onSuccess);
  AuthController.signupUser(new SignupUserDTO(email, password));
};

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
