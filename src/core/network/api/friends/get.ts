import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	friend_ids: string[];
};

export const apiFriendsGet = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/friends/get", dto));
