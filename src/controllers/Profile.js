import { URL } from '../core/constants/constants.js';
import { ViewsRegistry } from '../views/registry.js';
import { createController } from '../core/models/Controller/Controller.js';
import { Router } from '../core/modules/Router/Router.js';
import { store, actions, thunks } from '../store/store.js';
import { createReaction } from '../core/models/Action/Action.js';
import { userAPI } from '../core/network/api/user.js';
import { getUserDataDTO } from '../core/network/dto/user.js';

const reducer = ({ root, params }) => {
  const view = ViewsRegistry.Profile;
  store.dispatch(thunks.user.getUserData);
  store.once(
    createReaction(actions.user.getUserData.success, () => {
      const authorizedUser = store.getState().user;
      if (params.user_id === authorizedUser.id) {
        view.show(root, { user: authorizedUser });
      } else {
        userAPI.getUserData(getUserDataDTO(params.user_id)).then((json) => view.show(root, { user: json.user }));
      }
    }),
    createReaction(actions.user.getUserData.failure, () => Router.navigateTo(URL.Login))
  );
};

export const profileController = createController(reducer);
