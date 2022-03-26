import '../../dist/views.js';

import { SignupView } from '../../views/Signup/SignupView.js';
import { LoginView } from '../../views/Login/LoginView.js';
import { FeedView } from '../../views/Feed/Feed.js';
import { NotFoundView } from '../../views/NotFound/NotFoundView.js';
import { headerAdapter } from '../adapters/common.js';

export const ViewsRegistry = {
  Signup: new SignupView(Handlebars.templates.Signup, headerAdapter),
  Login: new LoginView(Handlebars.templates.Login, headerAdapter),
  Feed: new FeedView(Handlebars.templates.Feed, headerAdapter),
  NotFound: new NotFoundView(Handlebars.templates.NotFound, headerAdapter)
};
