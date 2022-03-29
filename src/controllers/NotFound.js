import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { store, thunks } from '../store/store.js';

const reducer = async ({ root }) => {
  const view = ViewsRegistry.NotFound;
  await store.dispatch(thunks.user.getUserData);
  view.show(root);
};

export const notFoundController = createController(reducer);
