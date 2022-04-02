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
        { 
          id: 'id1',  
          author: {
            id: 'id3',
            image: 'static/images/p1.jpeg',
            name: {
              first: 'Bob',
              last: 'Dylan',
            }, 
          },
          postedTime: 'yeaterday at 20:43',
          message: getMockPostMessage(), 
          images: getMockImages(),
          likesCount: '455',
          watchedCount: '800',
        },
        { 
          id: 'id2',  
          author: {
            id: 'id4',
            image: 'static/images/p2.png',
            name: {
              first: 'Harley',
              last: 'Pocket',
            }, 
          },
          postedTime: '11.03.2014 at 11:56',
          message: getMockPostMessage(), 
          images: getMockImages(),
          likesCount: '12',
          watchedCount: '40',
        },
      ]
    };
  }
};
