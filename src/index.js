import { Router } from './core/modules/Router/Router.js';
import { URL } from './core/constants/constants.js';
import { signupController } from './controllers/Signup.js';
import { loginController } from './controllers/Login.js';
import { notFoundController } from './controllers/NotFound.js';
import { logoutController } from './controllers/Logout.js';
import { baseController } from './controllers/Base.js';
import { feedController } from './controllers/Feed.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.route(URL.Base, baseController);
  Router.route(URL.Signup, signupController);
  Router.route(URL.Login, loginController);
  Router.route(URL.Logout, logoutController);
  Router.route(URL.Feed, feedController);

  Router.setNotFoundController(notFoundController);

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
