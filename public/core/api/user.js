import { fetchAPI } from './common.js';

const userMethods = {
  getData: '/user/get',
};

export const UserAPI = {
  /**
   * @param {GetUserDataDTO} dto
   * @return {Promise<JSON>}
   */
  async GetUserData(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(userMethods.getData, 'POST', body);
    if (!response.ok) {
      return null;
    }
    return response.json();
  },
};
