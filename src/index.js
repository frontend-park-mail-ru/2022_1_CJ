import { Router } from './core/modules/Router.js';
import { URL } from './core/constants/constants.js';
import { ViewsRegistry } from './core/constants/views_registry.js';
import { headerAdapter, userAdapter } from './core/adapters/common.js';
import { LogoutAction } from './core/actions/actions.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.setViewRoute(URL.Signup, new ViewsRegistry.SignupView(headerAdapter, userAdapter));
  Router.setViewRoute(URL.Login, new ViewsRegistry.LoginView(headerAdapter, userAdapter));
  Router.setNotFoundView(new ViewsRegistry.NotFoundView(headerAdapter, userAdapter));

  Router.setActonRoute(URL.Logout, LogoutAction);

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
