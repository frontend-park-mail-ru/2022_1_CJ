import { URL } from '../core/constants/constants.js';
import { createReaction } from '../core/models/Action/Action.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, actions, thunks } from '../store/store.js';

const reducer = () => {
  store.dispatch(thunks.user.getUserData);
  store.oneOf(
    createReaction(actions.user.getUserData.success, () => Router.navigateTo(URL.Feed)),
    createReaction(actions.user.getUserData.failure, () => Router.navigateTo(URL.Login))
  );
};

export const baseController = createController(reducer);
