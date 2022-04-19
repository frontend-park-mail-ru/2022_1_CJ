import { UserName } from "src/core/@types/user";
import { fetchAPI } from ".";
import { BasicResponse } from "../types";

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

export type SignupUserResponse = BasicResponse;

const signupUser = (dto: SignupUserRequest) => {
	const response = fetchAPI.post<SignupUserRequest, SignupUserResponse>(authMethods.signup, dto);
	console.log(response);
};

export const authAPi = {
	signupUser,
};
