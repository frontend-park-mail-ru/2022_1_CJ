import { baseController } from './Base.js';
import { feedController } from './Feed.js';
import { loginController } from './Login.js';
import { logoutController } from './Logout.js';
import { messengerController } from './Messenger.js';
import { notFoundController } from './NotFound.js';
import { signupController } from './Signup.js';

export const controllersRegistry = {
  base: baseController,
  feed: feedController,
  login: loginController,
  logout: logoutController,
  messenger: messengerController,
  notFound: notFoundController,
  signup: signupController
};
