import { URL } from '../core/constants/constants.js';
import { applyMiddlewares, createController } from '../core/models/Controller/Controller.js';
import { userMiddleware } from '../core/models/Controller/Middlewares.js';
import { Router } from '../core/modules/Router/Router.js';

const reducer = async (context) => {
  console.log(context);
  if (context.user.isAuthorized) {
    Router.navigateTo(URL.Feed);
  } else {
    Router.navigateTo(URL.Login);
  }
};

export const baseController = createController(reducer, applyMiddlewares(userMiddleware));
