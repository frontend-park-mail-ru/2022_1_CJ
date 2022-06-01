import { UserName } from "src/core/@types/user";
import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

export type SignupUserRequest = {
	email: string;
	name: UserName;
	password: string;
};

export type SignupUserResponse = BasicResponse;

export const signupUser = (dto: SignupUserRequest) => fetchAPI.post<SignupUserResponse>("/api/auth/signup", dto);
