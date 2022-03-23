import { headerAdapter } from '../../adapters/common.js';
import { URL } from '../../constants/constants.js';
import { ViewsRegistry } from '../../constants/views_registry.js';
import { applyMiddlewares, createController } from '../../models/Controller/Controller.js';
import { userMiddleware } from '../../models/Controller/Middlewares.js';
import { Router } from '../Router/Router.js';

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
