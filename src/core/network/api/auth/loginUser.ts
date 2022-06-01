import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type LoginUserResponse = BasicResponse;

export const loginUser = (dto: LoginUserRequest) => fetchAPI.post<LoginUserResponse>("/api/auth/login", dto);
