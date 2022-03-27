import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { ViewsRegistry } from '../views/registry.js';
import { Router } from '../core/modules/Router/Router.js';
import { userThunks, store } from '../store/Store.js';

const reducer = async (context) => {
  const view = ViewsRegistry.Login;
  await store.dispatch(userThunks.getUserData);
  const { user } = store.getState();
  if (user) {
    Router.navigateTo(URL.Feed);
  } else {
    view.context.assign({ user });
    view.show(context.root);
  }
};

export const loginController = createController(reducer);
