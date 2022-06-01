import { fetchAPI } from "src/core/network/api/common";

export type Request = {
	to: string;
};

export const apiFriendsRevokeRequest = (dto: Request) => fetchAPI.post("/api/friends/request/revoke", dto);
