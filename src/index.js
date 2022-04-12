import './core/helpers/handlebars.js';

import { Router } from './core/modules/Router/Router.js';
import { URL } from './core/constants/constants.js';
import { controllersRegistry } from './controllers/registry.js';

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Router.setRoot(root);

  Router.route(URL.Base, controllersRegistry.base);
  Router.route(URL.Signup, controllersRegistry.signup);
  Router.route(URL.Login, controllersRegistry.login);
  Router.route(URL.Logout, controllersRegistry.logout);
  Router.route(URL.Feed, controllersRegistry.feed);
  Router.route(URL.Messenger, controllersRegistry.messenger);
  Router.route(URL.Friends, controllersRegistry.friends);
  Router.route(URL.Search, controllersRegistry.search);
  Router.route(URL.UserProfile, controllersRegistry.profile);
  Router.route(URL.ProfileSettings, controllersRegistry.profileSettings);

  Router.setNotFoundController(controllersRegistry.notFound);

  Router.run();
});

// TODO: enhance it
window.onerror = (message, url, line, col, error) => {
  console.log(`[${url}][${line}:${col}]: [${error}]`);
  return true;
};
