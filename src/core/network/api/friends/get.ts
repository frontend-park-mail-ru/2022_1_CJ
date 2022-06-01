import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	user_id: string;
};

export type Response = {
	friend_ids: string[];
};

export const apiFriendsGet = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/friends/get", dto));
