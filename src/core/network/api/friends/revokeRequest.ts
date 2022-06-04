import { fetchAPI } from "src/core/network/api/common";

type Request = {
	to: string;
};

export const apiFriendsRevokeRequest = (dto: Request) => fetchAPI.post("/api/friends/request/revoke", dto);
