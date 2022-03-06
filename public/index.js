import { Router } from './core/modules/Router.js';
import { URL } from './core/constants/constants.js';
import { ViewsRegistry } from './core/constants/views_registry.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.setRoute(URL.Signup, ViewsRegistry.SignupView);
  Router.setRoute(URL.Login, ViewsRegistry.LoginView);

  Router.setNotFoundView(ViewsRegistry.NotFoundView);

  Router.run();
});

window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
