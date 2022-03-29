import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { ViewsRegistry } from '../views/registry.js';
import { Router } from '../core/modules/Router/Router.js';
import { thunks, store, actions } from '../store/store.js';
import { createReaction } from '../core/models/Action/Action.js';

const reducer = ({ root }) => {
  const view = ViewsRegistry.Signup;
  store.dispatch(thunks.user.getUserData);
  store.oneOf(
    createReaction(actions.user.getUserData.success, () => Router.navigateTo(URL.Feed)),
    createReaction(actions.user.getUserData.failure, () => view.show(root))
  );
};

export const signupController = createController(reducer);
