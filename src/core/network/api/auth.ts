import { UserName } from "src/core/@types/user";
import { fetchAPI } from ".";
import { BasicResponse } from "../types";

// TODO: make it generic (map url to request and response)

const authMethods = {
	signup: "/api/auth/signup",
	login: "/api/auth/login",
	logout: "/api/auth/logout",
};

type signupUserRequest = {
	email: string;
	name: UserName;
	password: string;
};

type signupUserResponse = BasicResponse;

const signupUser = (dto: signupUserRequest) => {
	const response = fetchAPI.post<signupUserRequest, signupUserResponse>(authMethods.signup, dto);
	console.log(response);
};

export const authAPi = {
	signupUser,
};
