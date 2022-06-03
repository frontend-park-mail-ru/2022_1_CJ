import { fetchAPI } from "src/core/network/api/common";

export type LoginUserRequest = {
	email: string;
	password: string;
};

export const loginUser = (dto: LoginUserRequest) => fetchAPI.post("/api/auth/login", dto);
