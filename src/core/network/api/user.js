import { getMockImages, getMockPostMessage } from '../../../test/mocks.js';
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
    const body = JSON.stringify(dto);
    const response = await fetchAPI(userMethods.getData, 'POST', body);
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async GetFeedPosts() {
    return {
      posts: [
        { author_id: 'id', message: getMockPostMessage(), images: getMockImages() },
        { author_id: 'id', message: getMockPostMessage(), images: getMockImages() }
      ]
    };
  }
};
