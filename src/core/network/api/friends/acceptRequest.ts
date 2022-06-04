import { fetchAPI } from "src/core/network/api/common";

type Request = {
	from: string;
};

export const apiFriendsAcceptRequest = (dto: Request) => fetchAPI.post("/api/friends/request/accept", dto);
