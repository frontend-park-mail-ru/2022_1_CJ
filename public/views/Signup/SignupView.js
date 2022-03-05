import { AuthController } from '../../core/controllers/auth.js';
import { SignupUserDTO } from '../../core/dto/auth.js';
import View from '../../core/models/View.js';
import EventBus, { AuthEvents, EventBusChannels } from '../../core/modules/EventBus.js';
import { TemplatesRegistry } from '../../core/modules/Registry.js';

export default class SignupView extends View {
  constructor() {
    super(null, TemplatesRegistry.Signup);
    this.setTitle('Signup');
  }

  addEventListeners() {
    super.addEventListeners();
    document.getElementById('submit').addEventListener('click', onSubmit);
  }
}

function onSubmit() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupFailure, onFailure);
  EventBus.subscribe(EventBusChannels.Auth, AuthEvents.SignupSuccess, onSuccess);
  AuthController.SignupUser(new SignupUserDTO(email, password));
}

function onFailure() {
  console.log('failed');
}

function onSuccess() {
  console.log('success');
}

