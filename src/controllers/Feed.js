import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { userStore, userThunks } from '../stores/UserStore.js';

const reducer = (context) => {
  const view = ViewsRegistry.Feed;
  userStore.dispatch(userThunks.getUserData);
  userStore.once(({ payload }) => {
    if (!payload.user) {
      Router.navigateTo(URL.Login);
      return;
    }

    view.context.assign(payload);
    view.show(context.root);
  });
};

export const feedController = createController(reducer);
