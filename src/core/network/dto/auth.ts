import { UserName } from "src/core/@types/user";
import { BasicResponse } from "./common";

export type SignupUserRequest = {
	email: string;
	name: UserName;
	password: string;
};

export type SignupUserResponse = BasicResponse;

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type LoginUserResponse = BasicResponse;
