import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { userStore, userThunks } from '../stores/UserStore.js';

const reducer = () => {
  userStore.dispatch(userThunks.getUserData);
  const unsubscribe = userStore.subscribe(({ payload }) => {
    if (payload.user) {
      Router.navigateTo(URL.Feed);
    } else {
      Router.navigateTo(URL.Login);
    }
  });
  return unsubscribe;
};

export const baseController = createController(reducer);
