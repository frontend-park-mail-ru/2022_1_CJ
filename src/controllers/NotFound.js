import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { store, userThunks } from '../store/Store.js';

const reducer = async ({ root }) => {
  const view = ViewsRegistry.NotFound;
  await store.dispatch(userThunks.getUserData);
  view.show(root);
};

export const notFoundController = createController(reducer);
