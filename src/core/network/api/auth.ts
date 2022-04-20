import { UserName } from "src/core/@types/user";
import { fetchAPI } from ".";
import { ErrorResponse } from "../types";

// TODO: make it generic (map url to request and response)

const authMethods = {
	signup: "/api/auth/signup",
	login: "/api/auth/login",
	logout: "/api/auth/logout",
};

export type SignupUserRequest = {
	email: string;
	name: UserName;
	password: string;
};

export type SignupUserResponse = ErrorResponse;

const signupUser = (dto: SignupUserRequest) => {
	fetchAPI.post<SignupUserRequest, SignupUserResponse>(authMethods.signup, dto);
};

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type LoginUserResponse = ErrorResponse;

const loginUser = (dto: LoginUserRequest) => {
	fetchAPI.post<LoginUserRequest, LoginUserResponse>(authMethods.login, dto);
};

export const authAPi = {
	signupUser,
	loginUser,
};
