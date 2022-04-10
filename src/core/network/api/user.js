import { CodedError } from '../../constants/errors.js';
import { httpMethod } from '../../constants/network.js';
import { fetchAPI } from './common.js';

const userMethods = {
  getData: '/api/user/get',
  getFeedPosts: '/api/user/feed',
  getUserPosts: '/api/user/posts'
};

export const UserAPI = {
  /**
   * @param {Object} dto
   * @returns {Promise<[JSON, CodedError]>}
   */
  async GetUserData(dto) {
    const response = await fetchAPI(userMethods.getData, httpMethod.GET, { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async getFeedPosts() {
    const response = await fetchAPI(userMethods.getFeedPosts, httpMethod.GET);
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async getUserPosts() {
    const response = await fetchAPI(userMethods.getUserPosts, httpMethod.GET);
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  }
};
