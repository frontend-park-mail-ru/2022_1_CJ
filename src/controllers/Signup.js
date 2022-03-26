import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { ViewsRegistry } from '../views/registry.js';
import { Router } from '../core/modules/Router/Router.js';
import { userThunks, userStore } from '../stores/UserStore.js';

const reducer = (context) => {
  const view = ViewsRegistry.Signup;
  userStore.dispatch(userThunks.getUserData);
  userStore.once(({ payload }) => {
    if (payload.user) {
      Router.navigateTo(URL.Feed);
      return;
    }

    view.context.assign(payload);
    view.show(context.root);
  });
};

export const signupController = createController(reducer);
