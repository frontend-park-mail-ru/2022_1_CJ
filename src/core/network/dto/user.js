export class GetUserDataDTO {
  /**
   * @param {String} userID
   */
  constructor(userID = '') {
    // TODO: maybe backend should switch to js style naming
    this.user_id = userID;
  }
}

export const searchUsersDTO = (selector) => {
  return { selector };
};
