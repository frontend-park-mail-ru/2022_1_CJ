import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	friend_id: string;
};

export const apiFriendsDeleteFriend = (dto: Request) => fetchAPI.delete(withQuery("/api/friends/delete", dto));
