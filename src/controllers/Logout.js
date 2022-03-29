import { URL } from '../core/constants/constants.js';
import { createController } from '../core/models/Controller/Controller.js';
import { AuthAPI } from '../core/network/api/auth.js';
import { Router } from '../core/modules/Router/Router.js';

const reducer = async () => {
  // TODO: move to store
  await AuthAPI.LogoutUser();
  Router.navigateTo(URL.Login);
};

export const logoutController = createController(reducer);
