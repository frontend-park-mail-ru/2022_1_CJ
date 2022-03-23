import { URL } from '../../constants/constants.js';
import { applyMiddlewares, createController } from '../../models/Controller/Controller.js';
import { userMiddleware } from '../../models/Controller/Middlewares.js';
import { Router } from '../Router/Router.js';

const reducer = async (context) => {
  console.log(context);
  if (context.user.isAuthorized) {
    Router.navigateTo(URL.Feed);
  } else {
    Router.navigateTo(URL.Login);
  }
};

export const baseController = createController(reducer, applyMiddlewares(userMiddleware));
