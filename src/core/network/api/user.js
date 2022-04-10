import { getMockPosts } from '../../../test/mocks.js';
import { CodedError } from '../../constants/errors.js';
import { httpMethod } from '../../constants/network.js';
import { fetchAPI } from './common.js';

const userMethods = {
  getData: '/api/user/get',
  getFeedPostIDs: '/api/user/feed'
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

  async getFeedPostIDs() {
    const response = await fetchAPI(userMethods.getFeedPostIDs, httpMethod.GET);
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async GetProfilePosts() {
    return {
      posts: getMockPosts()
    };
  }
};
