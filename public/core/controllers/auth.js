import { AuthService } from "../services/auth.js";

export const AuthController = {
	/**
   * @param {SignupUserDTO} dto
   */
	SignupUser(dto) {
		// TODO: add data validation
		AuthService.SignupUser(dto);
	},

	/**
   * @param {LoginUserDTO} dto
   */
	LoginUser(dto) {
		AuthService.LoginUser(dto);
	}
};
