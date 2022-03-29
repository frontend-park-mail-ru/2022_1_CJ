import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { ViewsRegistry } from '../views/registry.js';
import { Router } from '../core/modules/Router/Router.js';
import { userThunks, store, userActions } from '../store/store.js';
import { createReaction } from '../core/models/Action/Action.js';

const reducer = ({ root }) => {
  const view = ViewsRegistry.Login;
  store.dispatch(userThunks.getUserData);
  store.oneOf(
    createReaction(userActions.getUserDataSuccess, () => Router.navigateTo(URL.Feed)),
    createReaction(userActions.getUserDataFailure, () => view.show(root))
  );
};

export const loginController = createController(reducer);
