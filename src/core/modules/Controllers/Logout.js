import { URL } from '../../constants/constants.js';
import { createController } from '../../models/Controller/Controller.js';
import { AuthAPI } from '../../network/api/auth.js';
import { Router } from '../Router/Router.js';

const reducer = async () => {
  await AuthAPI.LogoutUser();
  Router.navigateTo(URL.Login);
};

export const logoutController = createController(reducer);
