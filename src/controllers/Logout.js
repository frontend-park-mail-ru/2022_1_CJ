import { URL } from '../core/constants/constants.js';
import { handleError } from '../core/helpers/errors.js';
import { createReaction } from '../core/models/Action/Action.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { actions, store, thunks } from '../store/store.js';

const reducer = () => {
  store.dispatch(thunks.user.logout);
  store.once(
    createReaction(actions.user.logout.success, () => Router.navigateTo(URL.Login)),
    createReaction(actions.user.logout.failure, ({ err }) => handleError(err))
  );
};

export const logoutController = createController(reducer);
