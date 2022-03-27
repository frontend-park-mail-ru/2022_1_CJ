import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { store, userThunks } from '../store/Store.js';

const reducer = async (context) => {
  const view = ViewsRegistry.NotFound;
  await store.dispatch(userThunks.getUserData);
  const { user } = store.getState();
  view.context.assign({ user });
  view.show(context.root);
};

export const notFoundController = createController(reducer);
