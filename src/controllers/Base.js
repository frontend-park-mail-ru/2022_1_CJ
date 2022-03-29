import { URL } from '../core/constants/constants.js';
import { createReaction } from '../core/models/Action/Action.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, userActions, userThunks } from '../store/Store.js';

const reducer = () => {
  store.dispatch(userThunks.getUserData);
  store.oneOf(
    createReaction(userActions.getUserDataSuccess, () => Router.navigateTo(URL.Feed)),
    createReaction(userActions.getUserDataFailure, () => Router.navigateTo(URL.Login))
  );
};

export const baseController = createController(reducer);
