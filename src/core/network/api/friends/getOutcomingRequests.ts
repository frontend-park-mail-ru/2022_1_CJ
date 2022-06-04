import { fetchAPI } from "src/core/network/api/common";

type Response = {
	request_ids: string[];
};

export const apiFriendsGetOutcomingRequests = () => fetchAPI.get<Response>("/api/friends/requests/outcoming");
