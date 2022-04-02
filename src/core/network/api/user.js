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
    const response = await fetchAPI(userMethods.getData, 'GET', { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  async GetFeedPosts() {
    return {
      posts: [
<<<<<<< HEAD
        { post_id: 'id256', author_id: 'id26', author_name: {first: 'Nar', last: 'Ick'}, message: getMockPostMessage(), images: getMockImages() },
        { post_id: 'id123', author_id: 'id13', author_name: {first: 'Man', last: 'Stack'}, message: getMockPostMessage(), images: getMockImages() }
=======
        { authorID: 'post-id1', message: getMockPostMessage(), images: getMockImages() },
        { authorID: 'post-id1', message: getMockPostMessage(), images: getMockImages() }
>>>>>>> 859466f2c112652f180b9e07276d995a781539f9
      ]
    };
  }
};
