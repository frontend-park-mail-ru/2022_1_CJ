import { fetchAPI } from "src/core/network/api/common";

export type Response = {
	request_ids: string[];
};

export const apiFriendsGetOutcomingRequests = () => fetchAPI.get<Response>("/api/friends/requests/outcoming");
