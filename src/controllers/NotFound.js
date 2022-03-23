import { headerAdapter } from '../core/adapters/common.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { applyMiddlewares, createController } from '../core/models/Controller/Controller.js';
import { userMiddleware } from '../core/models/Controller/Middlewares.js';

const reducer = (context) => {
  const view = new ViewsRegistry.NotFoundView(headerAdapter);
  view.setContext(context);
  view.render(document.getElementById('root'));
};

export const notFoundController = createController(reducer, applyMiddlewares(userMiddleware));
