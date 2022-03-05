import '../../precompiled/Header.js';
import '../../precompiled/Login.js';
import '../../precompiled/NotFound.js';
import '../../precompiled/Signup.js';

import LoginView from '../../views/Login/LoginView.js';
import NotFoundView from '../../views/NotFound/NotFoundView.js';
import SignupView from '../../views/Signup/SignupView.js';

export const TemplatesRegistry = {
  Header: Handlebars.templates.Header,
  Login: Handlebars.templates.Login,
  NotFound: Handlebars.templates.NotFound,
  Signup: Handlebars.templates.Signup,
};

export const ViewsRegistry = {
  LoginView,
  SignupView,
  NotFoundView,
};
