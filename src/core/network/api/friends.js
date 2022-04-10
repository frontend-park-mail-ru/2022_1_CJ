import { CodedError } from '../../constants/errors.js';
import { httpMethod } from '../../constants/network.js';
import { fetchAPI } from './common.js';

const friendsMethods = {
  createPost: '/api/post/create',
  getPost: '/api/post/get',
  editPost: '/api/post/edit',
  deletePost: '/api/post/delete'
};

export const postAPI = {
  createPost: async (dto) => {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(friendsMethods.createPost, httpMethod.POST, { body });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  getPost: async (dto) => {
    const response = await fetchAPI(friendsMethods.getPost, httpMethod.GET, { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  editPost: async (dto) => {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(friendsMethods.editPost, httpMethod.PUT, { body });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  },

  deletePost: async (dto) => {
    const response = await fetchAPI(friendsMethods.deletePost, httpMethod.DELETE, { query: dto });
    const json = await response.json();
    if (!response.ok) {
      throw new CodedError(json.message, json.code);
    }
    return json;
  }
};
