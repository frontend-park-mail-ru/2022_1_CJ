import { CodedError } from '../../constants/errors.js';
import { httpMethod } from '../../constants/network.js';
import { fetchAPI, fetchAPIFormData } from './common.js';

const userMethods = {
  getData: '/api/user/get',
  getFeedPosts: '/api/user/feed',
  getUserPosts: '/api/user/posts',
  updatePhoto: '/api/user/update_photo',
  searchUsers: '/api/user/search'
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
  },

  async updatePhoto(formData) {
    // TODO: extremely bad
    const response = await fetchAPIFormData(userMethods.updatePhoto, httpMethod.POST, { body: formData });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async searchUsers(dto) {
    const response = await fetchAPI(userMethods.searchUsers, httpMethod.GET, { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  }
};
