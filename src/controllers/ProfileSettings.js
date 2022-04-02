import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, actions, thunks } from '../store/store.js';
import { createReaction } from '../core/models/Action/Action.js';

const reducer = ({ root }) => {
  const view = ViewsRegistry.ProfileSettings;
  store.dispatch(thunks.user.getUserData);
  store.once(
    createReaction(actions.user.getUserData.success, () => view.show(root)),
    createReaction(actions.user.getUserData.failure, () => Router.navigateTo(URL.Login))
  );
};

export const profileSettingsController = createController(reducer);
