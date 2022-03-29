import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, userActions, userThunks } from '../store/Store.js';
import { createReaction } from '../core/models/Action/Action.js';

const reducer = ({ root }) => {
  const view = ViewsRegistry.Feed;
  store.dispatch(userThunks.getUserData);
  store.oneOf(
    createReaction(userActions.getUserDataSuccess, () => view.show(root)),
    createReaction(userActions.getUserDataFailure, () => Router.navigateTo(URL.Login))
  );
};

export const feedController = createController(reducer);
