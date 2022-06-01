import { fetchAPI } from "src/core/network/api/common";

export type Response = {
	request_ids: string[];
};

export const apiFriendsGetIncomingRequests = () => fetchAPI.get<Response>("/api/friends/requests/incoming");
