import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, userThunks } from '../store/Store.js';

const reducer = async () => {
  await store.dispatch(userThunks.getUserData);
  const { user } = store.getState();
  if (user) {
    Router.navigateTo(URL.Feed);
  } else {
    Router.navigateTo(URL.Login);
  }
};

export const baseController = createController(reducer);
