import { getMockPosts } from '../../../test/mocks.js';
import { CodedError } from '../../constants/errors.js';
import { fetchAPI } from './common.js';

const userMethods = {
  getData: '/api/user/get'
};

export const UserAPI = {
  /**
   * @param {Object} dto
   * @returns {Promise<[JSON, CodedError]>}
   */
  async GetUserData(dto) {
    const response = await fetchAPI(userMethods.getData, 'GET', { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async GetFeedPosts() {
    return {
      posts: getMockPosts(),
    };
  },

  async GetProfilePosts() {
    return {
      posts: getMockPosts(),
    };
  },
};
