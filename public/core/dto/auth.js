export class SignupUserDTO {
  /**
   * @param {String} email
   * @param {String} firstname
   * @param {String} lastname
   * @param {String} password
   */
  constructor(email, firstname, lastname, password) {
    this.email = email;
    this.name = { first: firstname, last: lastname };
    this.password = password;
  }
}

export class LoginUserDTO {
  /**
   * @param {String} email
   * @param {String} password
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
