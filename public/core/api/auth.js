import { fetchAPI } from './common.js';

const authMethods = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
};

export const AuthAPI = {
  /**
   * @param {SignupUserDTO} dto
   * @return {Promise<JSON>}
   */
  async SignupUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.signup, 'POST', body);
    if (!response.ok) {
      return null;
    }
    return response.json();
  },

  /**
   * @param {LoginUserDTO} dto
   * @return {Promise<JSON>}
   */
  async LoginUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.login, 'POST', body);
    if (!response.ok) {
      return null;
    }
    return response.json();
  },

  async LogoutUser() {
    const response = await fetchAPI(authMethods.logout, 'GET', null);
    if (!response.ok) {
      return null;
    }
    return response.json();
  },
};
