import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, userThunks } from '../store/Store.js';

const reducer = async (context) => {
  const view = ViewsRegistry.Feed;
  await store.dispatch(userThunks.getUserData);
  const { user } = store.getState();
  if (user) {
    view.context.assign({ user });
    view.show(context.root);
  } else {
    Router.navigateTo(URL.Login);
  }
};

export const feedController = createController(reducer);
