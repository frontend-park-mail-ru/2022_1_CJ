import { CodedError } from '../../constants/errors.js';
import { fetchAPI } from './common.js';

const authMethods = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  logout: '/api/auth/logout'
};

export const AuthAPI = {
  /**
   * @param {Object} dto
   * @returns {Promise<JSON>}
   */
  async SignupUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.signup, 'POST', body);
    if (!response.ok) {
      throw new CodedError(response.statusText, response.status);
    }
    return response.json();
  },

  /**
   * @param {Object} dto
   * @returns {Promise<JSON>}
   */
  async LoginUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.login, 'POST', body);
    if (!response.ok) {
      throw new CodedError(response.statusText, response.status);
    }
    return response.json();
  },

  /**
   * @returns {Promise<CodedError>}
   */
  async LogoutUser() {
    const response = await fetchAPI(authMethods.logout, 'DELETE', null);
    if (!response.ok) {
      return new CodedError(response.statusText, response.status);
    }
    return null;
  }
};
