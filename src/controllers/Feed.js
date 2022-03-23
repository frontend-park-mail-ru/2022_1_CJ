import { headerAdapter } from '../core/adapters/common.js';
import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { applyMiddlewares, createController } from '../core/models/Controller/Controller.js';
import { userMiddleware } from '../core/models/Controller/Middlewares.js';
import { Router } from '../core/modules/Router/Router.js';

const reducer = (context) => {
  if (context.user.isAuthorized === false) {
    Router.navigateTo(URL.Login);
    return;
  }

  const view = new ViewsRegistry.FeedView(headerAdapter);
  view.setContext(context);
  view.render(document.getElementById('root'));
};

export const feedController = createController(reducer, applyMiddlewares(userMiddleware));
