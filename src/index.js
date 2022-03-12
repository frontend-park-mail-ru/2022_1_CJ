import { Router } from './core/modules/Router.js';
import { URL } from './core/constants/constants.js';
import { ViewsRegistry } from './core/constants/views_registry.js';
import { AuthAdapter, HeaderAdapter } from './core/adapters/common.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.setRoute(URL.Signup, new ViewsRegistry.SignupView(HeaderAdapter, AuthAdapter));
  Router.setRoute(URL.Login, new ViewsRegistry.LoginView(HeaderAdapter, AuthAdapter));
  // Router.setRoute(URL.Feed, new ViewsRegistry.FeedView());

  Router.setNotFoundView(new ViewsRegistry.NotFoundView(HeaderAdapter, AuthAdapter));

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
