import { PostWrapper } from "src/core/@types/post";
import { fetchAPI } from "src/core/network/api/common";

export type Response = {
	posts: PostWrapper[];
};

export const apiUserGetFeed = () => fetchAPI.get<Response>("/api/user/feed");
