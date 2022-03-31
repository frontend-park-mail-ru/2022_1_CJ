import '../dist/views.js';

import { feedView } from './Feed/FeedView.js';
import { loginView } from './Login/LoginView.js';
import { notFoundView } from './NotFound/NotFoundView.js';
import { signupView } from './Signup/SignupView.js';
import { profileView } from './Profile/ProfileView.js';

export const ViewsRegistry = {
  Signup: signupView(Handlebars.templates.Signup),
  Login: loginView(Handlebars.templates.Login),
  Feed: feedView(Handlebars.templates.Feed),
  NotFound: notFoundView(Handlebars.templates.NotFound),
  Profile: profileView(Handlebars.templates.Profile)
};
