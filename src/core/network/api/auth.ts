import { fetchAPI } from "src/core/network/api/common";
import { LoginUserRequest, LoginUserResponse, SignupUserRequest, SignupUserResponse } from "src/core/network/dto/auth";

const authMethods = {
	signup: "/api/auth/signup",
	login: "/api/auth/login",
	logout: "/api/auth/logout",
};

const signupUser = (dto: SignupUserRequest) => fetchAPI.post<SignupUserResponse>(authMethods.signup, dto);

const loginUser = (dto: LoginUserRequest) => fetchAPI.post<LoginUserResponse>(authMethods.login, dto);

const logoutUser = () => fetchAPI.delete(authMethods.logout);

export const authAPi = {
	signupUser,
	loginUser,
	logoutUser,
};
