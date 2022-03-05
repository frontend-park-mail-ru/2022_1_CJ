import { fetchAPI } from './common.js';

const userMethods = {
  signup: '/user/signup',
  login: '/user/login',
};

export const AuthAPI = {
  /**
   * @param {SignupUserDTO} dto
   * @return {Promise<JSON>}
   */
  async SignupUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(userMethods.signup, 'POST', body);
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
    const response = await fetchAPI(userMethods.login, 'POST', body);
    if (!response.ok) {
      return null;
    }
    return response.json();
  }
}
