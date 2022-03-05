class AuthService {
  /** 
   * @param {SignupUserDTO} dto 
   */
  SignupUser(dto) {
    console.log(dto);
  }
}

export default new AuthService();