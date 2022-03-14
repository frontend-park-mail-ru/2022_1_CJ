import { URL } from '../../core/constants/constants.js';
import { Component } from '../../core/models/Component.js';
import { Router } from '../../core/modules/Router.js';
import { AuthAPI } from '../../core/network/api/auth.js';

/**
 * @param {Event} e
 */
const onLogout = async (e) => {
  e.preventDefault();
  await AuthAPI.LogoutUser();
  Router.navigateTo(URL.Login);
};

export class HeaderComponent extends Component {
  addEventListeners() {
    document.getElementById('logout')?.addEventListener('click', onLogout);
    super.addEventListeners();
  }
}
