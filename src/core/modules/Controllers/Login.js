import { headerAdapter } from '../../adapters/common.js';
import { URL } from '../../constants/constants.js';
import { ViewsRegistry } from '../../constants/views_registry.js';
import { applyMiddlewares, createController } from '../../models/Controller/Controller.js';
import { userMiddleware } from '../../models/Controller/Middlewares.js';
import { Router } from '../Router/Router.js';

const reducer = (context) => {
  if (context.user.isAuthorized === true) {
    Router.navigateTo(URL.Feed);
    return;
  }

  const view = new ViewsRegistry.LoginView(headerAdapter);
  view.setContext(context);
  view.render(document.getElementById('root'));
};

export const loginController = createController(reducer, applyMiddlewares(userMiddleware));
