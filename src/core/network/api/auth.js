import { CodedError } from '../../constants/errors.js';
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
   * @returns {Promise<[JSON, CodedError]>}
   */
  async LoginUser(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(authMethods.login, 'POST', body);
    if (!response.ok) {
      return [null, new CodedError(response.statusText, response.status)];
    }

    const json = await response.json();
    return [json, null];
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
  },
};
