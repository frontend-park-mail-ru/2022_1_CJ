import { SignupUserDTO } from "../dto/auth.js";
import AuthService from "../services/auth.js"

class AuthController {
  /** 
   * @param {SignupUserDTO} dto 
   */
  SignupUser(dto) {
    AuthService.SignupUser(dto);
  }
}

export default new AuthController();
