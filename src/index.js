import { Router } from './core/modules/Router.js';
import { URL } from './core/constants/constants.js';
import { ViewsRegistry } from './core/constants/views_registry.js';
import { UserAdapter, HeaderAdapter } from './core/adapters/common.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.setRoute(URL.Signup, new ViewsRegistry.SignupView(HeaderAdapter, UserAdapter));
  Router.setRoute(URL.Login, new ViewsRegistry.LoginView(HeaderAdapter, UserAdapter));
  // Router.setRoute(URL.Feed, new ViewsRegistry.FeedView());

  Router.setNotFoundView(new ViewsRegistry.NotFoundView(HeaderAdapter, UserAdapter));

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
