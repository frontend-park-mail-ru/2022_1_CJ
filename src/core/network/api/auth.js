import { CodedError } from '../../constants/errors.js';
import { httpMethod } from '../../constants/network.js';
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
    const response = await fetchAPI(authMethods.signup, httpMethod.POST, { body });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  /**
   * @param {Object} dto
   * @returns {Promise<JSON>}
   */
  async LoginUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.login, httpMethod.POST, { body });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  /**
   * @returns {Promise<CodedError>}
   */
  async LogoutUser() {
    const response = await fetchAPI(authMethods.logout, httpMethod.DELETE);
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return null;
  }
};
