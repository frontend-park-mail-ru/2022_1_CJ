import { headerAdapter } from '../core/adapters/common.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { userStore, userThunks } from '../stores/UserStore.js';

const reducer = (context) => {
  const view = new ViewsRegistry.NotFoundView(headerAdapter);
  userStore.dispatch(userThunks.getUserData);
  const unsubscribe = userStore.subscribe(({ payload }) => {
    view.context.assign(payload);
    view.render(context.root);
  });
  return unsubscribe;
};

export const notFoundController = createController(reducer);
