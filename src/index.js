import { Router } from './core/modules/Router/Router.js';
import { URL } from './core/constants/constants.js';
import { signupController } from './core/modules/Controllers/Signup.js';
import { loginController } from './core/modules/Controllers/Login.js';
import { notFoundController } from './core/modules/Controllers/NotFound.js';
import { logoutController } from './core/modules/Controllers/Logout.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.route(URL.Signup, signupController);
  Router.route(URL.Login, loginController);
  Router.route(URL.Logout, logoutController);

  Router.setNotFoundController(notFoundController);

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
