/* eslint-disable no-undef */
import '../dist/components.js';

import { dialogsComponent } from './Dialogs/Dialogs.js';
import { headerComponent } from './Header/Header.js';
import { loginFormComponent } from './LoginForm/LoginForm.js';
import { postComponent } from './Post/Post.js';
import { signupFormComponent } from './SignupForm/SignupForm.js';

export const ComponentsRegistry = {
  Header: headerComponent(Handlebars.templates.Header),
  SignupForm: signupFormComponent(Handlebars.templates.SignupForm),
  LoginForm: loginFormComponent(Handlebars.templates.LoginForm),
  Post: postComponent(Handlebars.templates.Post),
  Dialogs: dialogsComponent(Handlebars.templates.Dialogs)
};
