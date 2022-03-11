import { AuthAPI } from "../../core/api/auth.js";
import { URL } from "../../core/constants/constants.js";
import Component from "../../core/models/Component.js";
import { Router } from "../../core/modules/Router.js";

export class HeaderComponent extends Component {
  addEventListeners() {
    super.addEventListeners();
    document.getElementById('logout')?.addEventListener('click', onLogout);
  }
}

/**
 * @param {Event} e 
 */
async function onLogout(e) {
  e.preventDefault();
  await AuthAPI.LogoutUser();
  Router.navigateTo(URL.Login);
}
