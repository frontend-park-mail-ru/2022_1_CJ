import { headerAdapter } from '../core/adapters/common.js';
import { URL } from '../core/constants/constants.js';
import { applyMiddlewares, createController } from '../core/models/Controller/Controller.js';
import { userMiddleware } from '../core/models/Controller/Middlewares.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { Router } from '../core/modules/Router/Router.js';

const reducer = (context) => {
  if (context.user.isAuthorized === true) {
    Router.navigateTo(URL.Feed);
    return;
  }

  const view = new ViewsRegistry.LoginView(headerAdapter);
  view.context.set(context);
  view.render(context.root);
};

export const loginController = createController(reducer, applyMiddlewares(userMiddleware));
