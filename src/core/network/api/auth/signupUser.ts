import { UserName } from "src/core/@types/user";
import { fetchAPI } from "src/core/network/api/common";

export type SignupUserRequest = {
	email: string;
	name: UserName;
	password: string;
};

export const signupUser = (dto: SignupUserRequest) => fetchAPI.post("/api/auth/signup", dto);
