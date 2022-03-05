import { AuthService } from '../services/auth.js';

export const AuthController = {
  /**
   * @param {SignupUserDTO} dto
   */
  signupUser(dto) {
    // TODO: add data validation
    AuthService.SignupUser(dto);
  },
};
