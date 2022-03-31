/* eslint-disable no-undef */
import '../dist/views.js';

import { feedView } from './Feed/Feed.js';
import { loginView } from './Login/LoginView.js';
import { messengerView } from './Messenger/Messenger.js';
import { notFoundView } from './NotFound/NotFoundView.js';
import { signupView } from './Signup/SignupView.js';

export const ViewsRegistry = {
  Signup: signupView(Handlebars.templates.Signup),
  Login: loginView(Handlebars.templates.Login),
  Feed: feedView(Handlebars.templates.Feed),
  NotFound: notFoundView(Handlebars.templates.NotFound),
  Messenger: messengerView(Handlebars.templates.Messenger)
};
