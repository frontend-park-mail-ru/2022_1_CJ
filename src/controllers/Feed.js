import { headerAdapter } from '../core/adapters/common.js';
import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../core/constants/views_registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { userStore, userThunks } from '../stores/UserStore.js';

const reducer = (context) => {
  const view = new ViewsRegistry.FeedView(headerAdapter);
  userStore.dispatch(userThunks.getUserData);
  const unsubscribe = userStore.subscribe((state) => {
    if (!state.user) {
      Router.navigateTo(URL.Login);
      return;
    }

    view.context.set(state);
    view.render(context.root);
  });
  return unsubscribe;
};

export const feedController = createController(reducer);
