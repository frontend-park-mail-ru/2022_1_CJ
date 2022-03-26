import '../dist/views.js';

import { SignupView } from './Signup/SignupView.js';
import { LoginView } from './Login/LoginView.js';
import { FeedView } from './Feed/Feed.js';
import { NotFoundView } from './NotFound/NotFoundView.js';
import { headerAdapter } from '../core/adapters/common.js';

export const ViewsRegistry = {
  Signup: new SignupView(Handlebars.templates.Signup, headerAdapter),
  Login: new LoginView(Handlebars.templates.Login, headerAdapter),
  Feed: new FeedView(Handlebars.templates.Feed, headerAdapter),
  NotFound: new NotFoundView(Handlebars.templates.NotFound, headerAdapter)
};
