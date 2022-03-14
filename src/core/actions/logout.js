import { URL } from "../constants/constants.js";
import { Router } from "../modules/Router.js";
import { AuthAPI } from "../network/api/auth.js";

export const LogoutAction = async () => {
  await AuthAPI.LogoutUser();
  Router.navigateTo(URL.Login);
};
