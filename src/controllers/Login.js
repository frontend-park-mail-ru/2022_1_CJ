import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { ViewsRegistry } from '../views/registry.js';
import { Router } from '../core/modules/Router/Router.js';
import { userThunks, userStore } from '../stores/UserStore.js';

const reducer = (context) => {
  const view = ViewsRegistry.Login;
  userStore.dispatch(userThunks.getUserData);
  const unsubscribe = userStore.subscribe(({ payload }) => {
    if (payload.user) {
      Router.navigateTo(URL.Feed);
      return;
    }

    view.context.assign(payload);
    view.show(context.root);
  });
  return unsubscribe;
};

export const loginController = createController(reducer);
