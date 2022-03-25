import { headerAdapter } from '../core/adapters/common.js';
import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { applyMiddlewares, createController } from '../core/models/Controller/Controller.js';
import { userMiddleware } from './middlewares/middlewares.js';
import { Router } from '../core/modules/Router/Router.js';

const reducer = (context) => {
  if (context.user.isAuthorized === true) {
    Router.navigateTo(URL.Feed);
    return;
  }

  const view = new ViewsRegistry.SignupView(headerAdapter);
  view.context.set(context);
  view.render(context.root);
};

export const signupController = createController(reducer, applyMiddlewares(userMiddleware));
