import { fetchAPI } from "src/core/network/api/common";

export type Request = {
	to: string;
};

export const apiFriendsSendRequest = (dto: Request) => fetchAPI.post("/api/friends/request/send", dto);
