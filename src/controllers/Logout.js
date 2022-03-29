import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { actions, store, thunks } from '../store/store.js';

const reducer = () => {
  store.dispatch(thunks.user.logout);
  store.once(
    createReaction(actions.user.logout.success, () => Router.navigateTo(URL.Login)),
    createReaction(actions.user.logout.failure, ({ err }) => console.log(err))
  );
};

export const logoutController = createController(reducer);
