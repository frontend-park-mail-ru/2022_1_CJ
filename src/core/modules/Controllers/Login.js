import { headerAdapter } from '../../adapters/common.js';
import { ViewsRegistry } from '../../constants/views_registry.js';
import { applyMiddlewares, createController } from '../../models/Controller/Controller.js';
import { authMiddleware } from '../../models/Controller/Middlewares.js';

const reducer = (context) => {
  const view = new ViewsRegistry.LoginView(headerAdapter);
  view.setContext(context);
  view.render(document.getElementById('root'));
};

export const loginController = createController(reducer, applyMiddlewares(authMiddleware));
