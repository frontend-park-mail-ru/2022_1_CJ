import { fetchAPI } from './common.js';

const userMethods = {
  getData: '/api/user/get',
};

export const UserAPI = {
  /**
   * @param {GetUserDataDTO} dto
   * @return {Promise<JSON>, Error}
   */
  async GetUserData(dto) {
    const body = JSON.stringify(dto);
    const response = await fetchAPI(userMethods.getData, 'POST', body);
    if (!response.ok) {
      return [null, new Error(response.statusText)]; // TODO: switch to predefined errors and mapping from Status Code to them
    }
    return [await response.json(), null];
  },
};
